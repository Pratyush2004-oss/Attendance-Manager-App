import expressasyncHandler from "express-async-handler";
import BatchModel from "../models/batches.model.js";
import UserModel from "../models/auth.model.js";
import mongoose from "mongoose";
import AttendanceModel from "../models/attendance.model.js";
import OrganizationModel from "../models/organization.model.js";

// get-student list of the Organization same as batchId 
export const getAllStudentList = expressasyncHandler(async (req, res, next) => {
    try {
        const { batchId } = req.params;
        const batch = await BatchModel.findById(batchId);
        if (!batch) {
            return res.status(404).json({ error: "Batch not found" });
        }

        // Aggregation pipeline:
        const students = await UserModel.aggregate([
            {
                // 1. $match: Students who are verified, have the same organization as the batch, and are not in the batch
                $match: {
                    role: "student",
                    isVerified: true,
                    Organization: {
                        $elemMatch: { name: batch.Organization }
                    },
                    _id: { $nin: batch.students }
                }
            },
            {
                // 2. $project: Only select _id, name, email
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1
                }
            },
            {
                $sort: { createdAt: 1 }
            }
        ]);

        return res.status(200).json({ students });
    } catch (error) {
        console.log("Error in getAllStudentList controller: " + error);
        next(error);
    }
});

// create batch
export const createBatch = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        const { name, Organization } = req.body;

        if (!name || !Organization) {
            return res.status(400).json({ message: "Batch name and Organization is required" });
        }

        // find the Organization
        const organization = await OrganizationModel.findById(Organization);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }

        // Check if the user is teacher verified for the provided Organization
        const orgEntry = user.Organization.find(
            org => org._id.toString() === organization._id.toString() && org.isTeacherVerified === true
        );
        if (!orgEntry) {
            return res.status(403).json({ message: "You are not verified as a teacher for this Organization" });
        }

        // check if the batch name already exists
        const batch = await BatchModel.find({
            teacherId: user._id,
            name: name,
            Organization
        });

        if (batch.length > 0) {
            return res.status(400).json({ message: "Batch name already exists" });
        }
        const batchJoiningCode = Math.floor(100000 + Math.random() * 900000);
        const newBatch = await BatchModel.create({
            name,
            teacherId: user._id,
            batchJoiningCode,
            Organization
        });
        return res.status(201).json({ message: "Batch created successfully", batch: newBatch });
    } catch (error) {
        console.log("Error in createBatch controller: " + error);
        next(error);
    }
})

// add students to the batch by teacher
export const addStudentsByTeacher = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        const { batchId, studentIds } = req.body;

        if (!batchId) {
            return res.status(400).json({ error: "Batch ID is required" });
        }

        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({ error: "At least one student ID is required" });
        }

        const batch = await BatchModel.findById(batchId);

        if (!batch) {
            return res.status(404).json({ error: "Batch not found" });
        }

        if (batch.teacherId.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to add students to this batch" });
        }

        // check for the students who have same OrganizationIds as batch
        for (let studentId in studentIds) {
            if (!mongoose.Types.ObjectId.isValid(studentIds[studentId])) {
                continue;
            }
            const objectId = new mongoose.Types.ObjectId(studentIds[studentId]);
            const student = await UserModel.findById(objectId);
            if (!student) {
                continue;
            }
            if (!(student.role === "student" && student.isVerified && student.Organization.includes(batch.Organization))) {
                continue;
            }
            if (batch.students.includes(student._id)) {
                continue;
            }
            batch.students.push(student._id);
        }

        await batch.save();

        return res.status(200).json({ message: "Students added to batch successfully", batch });

    } catch (error) {
        console.log("Error in addStudentsByTeacher controller: " + error);
        next(error);
    }

})

// add students by entering the batch code
export const addStudentUsingCode = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        const { batchJoiningCode, batchId } = req.body;


        if (!batchJoiningCode || !batchId) {
            return res.status(400).json({ error: "Batch joining code and batch ID are required" });
        }

        const batch = await BatchModel.findById(batchId);

        if (!batch) {
            return res.status(404).json({ error: "Batch not found" });
        }

        // check if the student and batch are in the same organization
        if (!user.Organization.some((org) => org.equals(batch.Organization))) {
            return res.status(400).json({ error: "You are not authorized to join this batch" });
        }

        if (batch.students.includes(user._id)) {
            return res.status(400).json({ error: "You are already a student of this batch" });
        }

        if (batch.batchJoiningCode !== batchJoiningCode) {
            return res.status(400).json({ error: "Invalid batch joining code" });
        }

        batch.students.push(user._id);
        await batch.save();

        return res.status(200).json({ message: "You are added to the batch successfully" });


    } catch (error) {
        console.log("Error in addStudentUsingCode controller: " + error);
        next(error);
    }
})

// leave batch by student
export const leaveBatch = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        const { batchId } = req.body;

        if (!batchId) {
            return res.status(400).json({ message: "Batch ID is required" });
        }

        const batch = await BatchModel.findById(batchId);
        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        // Check if the user is a student in the batch
        if (!batch.students.includes(user._id)) {
            return res.status(403).json({ message: "You are not a student of this batch" });
        }

        // Remove the user from the batch's students array
        batch.students.pull(user._id);
        await batch.save();

        // Remove the user's attendance records for this batch
        await AttendanceModel.updateMany(
            { batchId: batchId },
            { $pull: { records: { studentId: user._id } } }
        );

        return res.status(200).json({ message: "You have left the batch successfully" });
    } catch (error) {
        console.log("Error in leaveBatch controller: " + error);
        next(error);
    }
});

// delete student from the batch
export const deleteStudentFromBatch = expressasyncHandler(async (req, res, next) => {
    try {
        const { studentId, batchId } = req.body;
        const user = req.user;

        if (!studentId || !batchId) {
            return res.status(400).json({ message: "Student ID and batch ID are required" });
        }

        const batchToUpdate = await BatchModel.findById(batchId);

        if (!batchToUpdate) {
            return res.status(404).json({ error: "Batch not found" });
        }

        const student = await UserModel.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // check the user is actually the teacher of that batch
        if (batchToUpdate.teacherId.toString() !== user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete students from this batch" });
        }

        // check whether the student is in the batch actually
        if (!batchToUpdate.students.includes(studentId)) {
            return res.status(404).json({ error: "Student not found in the batch" });
        }

        // todo: update all the attendance of the student for the perticular batch
        await AttendanceModel.updateMany({
            batchId: batchId,
            "records.studentId": studentId
        }, {
            $pull: {
                records: { studentId: studentId }
            }
        })

        batchToUpdate.students.pull(studentId);
        await batchToUpdate.save();

        return res.status(200).json({ message: "Student deleted from batch successfully" });
    } catch (error) {
        console.log("Error in deleteStudentFromBatch controller: " + error);
        next(error);
    }
})

// get all batches where the teacher exists
export const getAllBatchesForTeacher = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        // Extract organization ObjectIds from user.Organization array
        const userOrganizationIds = user.Organization.map(org =>
            typeof org._id === "object" ? org._id : mongoose.Types.ObjectId(org._id)
        );

        // Aggregation pipeline:
        // 1. $match: Find batches where teacherId matches and Organization is in user's organizations
        // 2. $lookup: Populate Organization details
        // 3. $project: Format output and add studentCount
        const batches = await BatchModel.aggregate([
            {
                $match: {
                    teacherId: new mongoose.Types.ObjectId(user._id),
                    Organization: { $in: userOrganizationIds }
                }
            },
            {
                $lookup: {
                    from: "organizations",
                    localField: "Organization",
                    foreignField: "_id",
                    as: "organizationDetails"
                }
            },
            {
                $unwind: "$organizationDetails"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    batchJoiningCode: 1,
                    Organization: { name: "$organizationDetails.name" },
                    studentCount: { $size: "$students" }
                }
            }
        ]);

        return res.status(200).json({ batchDetails: batches });
    } catch (error) {
        console.log("Error in getAllBatchesForTeacher controller: " + error);
        next(error);
    }
});

// get batch info by id for teacher
export const getBatchByIdForTeacher = expressasyncHandler(async (req, res, next) => {
    try {
        const { batchId } = req.params;
        const user = req.user;

        // Aggregation pipeline:
        // 1. $match: Find the batch by _id and teacherId
        // 2. $lookup: Populate student details
        // 3. $project: Format output
        const batches = await BatchModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(batchId),
                    teacherId: new mongoose.Types.ObjectId(user._id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "students",
                    foreignField: "_id",
                    as: "studentDetails"
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    students: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        guardian: 1
                    },
                    studentDetails: 1
                }
            }
        ]);

        if (!batches || batches.length === 0) {
            return res.status(404).json({ message: "Batch not found or you are not authorized" });
        }

        // Return batch info and populated student details
        return res.status(200).json({ batch: batches[0] });
    } catch (error) {
        console.log("Error in getBatchByIdForTeacher controller: " + error);
        next(error);
    }
});

// get all the batches where the student exists
export const getAllBatchesForStudent = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;

        // Aggregation pipeline:
        // 1. $match: Find batches where the user is in the students array
        // 2. $lookup: Populate Organization details
        // 3. $lookup: Populate teacher details
        // 4. $project: Format output and add studentCount
        const batches = await BatchModel.aggregate([
            {
                $match: {
                    students: new mongoose.Types.ObjectId(user._id)
                }
            },
            {
                $lookup: {
                    from: "organizations",
                    localField: "Organization",
                    foreignField: "_id",
                    as: "organizationDetails"
                }
            },
            {
                $unwind: "$organizationDetails"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "teacherDetails"
                }
            },
            {
                $unwind: "$teacherDetails"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    batchJoiningCode: 1,
                    Organization: { name: "$organizationDetails.name" },
                    teacher: { name: "$teacherDetails.name" },
                    studentCount: { $size: "$students" }
                }
            }
        ]);

        return res.status(200).json({ batchDetails: batches });
    } catch (error) {
        console.log("Error in getAllBatchesForStudent controller: " + error);
        next(error);
    }
});

// get all batches of the organization for students only
export const getAllBatchesofOrganization = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        // Extract organization ObjectIds from user.Organization array
        const userOrganizationIds = user.Organization.map(org =>
            typeof org._id === "object" ? org._id : mongoose.Types.ObjectId(org._id)
        );

        // Aggregation pipeline:
        // 1. $match: Find batches where Organization is in user's organizations and user is a student
        const batches = await BatchModel.aggregate([
            {
                $match: {
                    Organization: { $in: userOrganizationIds }
                }
            },
            // 2. $lookup: Populate Organization details
            {
                $lookup: {
                    from: "organizations",
                    localField: "Organization",
                    foreignField: "_id",
                    as: "organizationDetails"
                }
            },
            {
                $unwind: "$organizationDetails"
            },
            // 3. $lookup: Populate teacher details
            {
                $lookup: {
                    from: "users",
                    localField: "teacherId",
                    foreignField: "_id",
                    as: "teacherDetails"
                }
            },
            {
                $unwind: "$teacherDetails"
            },
            {
                // 4. $project: Format output and add isStudent flag
                $project: {
                    _id: 1,
                    name: 1,
                    Organization: { name: "$organizationDetails.name" },
                    teacherId: { name: "$teacherDetails.name" },
                    isStudent: {
                        $in: [new mongoose.Types.ObjectId(user._id), "$students"]
                    }
                }
            }
        ]);

        return res.status(200).json({ batchDetails: batches });
    } catch (error) {
        console.log("Error in getAllBatchesofOrganization controller: " + error);
        next(error);
    }
});

// delete batch only by teachers
export const deleteBatch = expressasyncHandler(async (req, res, next) => {
    const { batchId } = req.params;
    const user = req.user;

    try {
        if (!batchId) {
            return res.status(400).json({ message: "Batch ID is required" });
        }

        const batch = await BatchModel.findById(batchId);

        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        // check the user is actually the teacher of that batch
        if (batch.teacherId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this batch" });
        }

        // delete all the attendance of the batch
        await AttendanceModel.deleteMany({ batchId: batchId });

        // delete the batch
        await batch.deleteOne();

        res.status(200).json({ message: "Batch deleted successfully" });

    } catch (error) {
        console.log("Error in deleteBatch controller: " + error);
        next(error);
    }
})
