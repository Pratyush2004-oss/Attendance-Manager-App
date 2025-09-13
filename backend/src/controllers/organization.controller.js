import expressAsyncHandler from "express-async-handler";
import OrganizationModel from "../models/organization.model.js";
import UserModel from "../models/auth.model.js";
import mongoose from "mongoose";

// create organization with admin emails
export const createOrganization = expressAsyncHandler(async (req, res, next) => {
    try {
        const { name, adminIds } = req.body;
        if (!name || !adminIds || !Array.isArray(adminIds) || adminIds.length === 0) {
            return res.status(400).json({ message: "Name and admin emails are required" });
        }
        const organization = await OrganizationModel.create({
            name,
            adminIds
        });
        return res.status(200).json({ organization });
    } catch (error) {
        console.log("Error in createOrganization controller: " + error);
        next(error);
    }
});

// get all organization list
export const getOrganizationList = expressAsyncHandler(async (req, res, next) => {
    try {
        const organizations = await OrganizationModel.find().select("name _id");
        return res.status(200).json({ organizations });
    } catch (error) {
        console.log("Error in getOrganizationList controller: " + error);
        next(error);
    }
});

// get Organozation List where the current user is admin
export const getOrganizationListByAdmin = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;

        // Aggregation pipeline explanation:
        // 1. $match: Filter organizations where adminIds array contains the user's email.
        // 2. $project: Only include name and _id in the result.
        const organizations = await OrganizationModel.aggregate([
            {
                $match: {
                    adminIds: user.email
                }
            },
            {
                $project: {
                    name: 1,
                    _id: 1
                }
            }
        ]);

        return res.status(200).json({ organizations });
    } catch (error) {
        console.log("Error in getOrganizationListByAdmin controller: " + error);
        next(error);
    }
})

// get list of all teachers of the Organization for Organization admin 
export const getAllTeachersofOrganization = expressAsyncHandler(async (req, res, next) => {
    try {
        const { organizationId } = req.params;

        // Aggregation pipeline explanation:
        // 1. $match: Filter users who are verified teachers and have the organizationId in their Organization array.
        // 2. $unwind: Deconstruct the Organization array.
        // 3. $match: Only keep organizations matching the given organizationId.
        // 4. $lookup: Join with Organization collection to get organization details.
        // 5. $project: Include teacher info and organization details.
        const teachers = await UserModel.aggregate([
            {
                $match: {
                    role: "teacher",
                    isVerified: true,
                    "Organization.name": new mongoose.Types.ObjectId(organizationId)
                }
            },
            { $unwind: "$Organization" },
            {
                $match: {
                    "Organization.name": new mongoose.Types.ObjectId(organizationId)
                }
            },
            {
                $lookup: {
                    from: "organizations",
                    localField: "Organization.name",
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
                    email: 1,
                    organization: {
                        isTeacherVerified: "$Organization.isTeacherVerified"
                    }
                }
            }
        ]);

        return res.status(200).json({ teachers });
    } catch (error) {
        console.log("Error in getAllTeachersofOrganization controller: " + error);
        next(error);
    }
});

// verify teacher by the admin of the organization
export const verifyTeacherAccount = expressAsyncHandler(async (req, res, next) => {
    try {
        const { teacherId, organizationId } = req.body; // organizationId 
        const user = req.user;

        // 1. Check if current user is admin of the organization
        const organization = await OrganizationModel.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        if (!organization.adminIds.includes(user.email)) {
            return res.status(403).json({ message: "Unauthorized: Only organization admin can verify teachers" });
        }

        // 2. Find the teacher and check if they belong to this organization
        const teacher = await UserModel.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (teacher.role !== "teacher") {
            return res.status(400).json({ message: "User is not a teacher" });
        }

        // 3. Find the organization entry in teacher.Organization array
        const orgIndex = teacher.Organization.findIndex(
            org => org.name.toString() === organizationId
        );
        if (orgIndex === -1) {
            return res.status(400).json({ message: "Teacher does not belong to this organization" });
        }

        // 4. Update isTeacherVerified to true for this organization
        teacher.Organization[orgIndex].isTeacherVerified = true;
        await teacher.save();

        return res.status(200).json({ message: "Teacher verified successfully" });
    } catch (error) {
        console.log("Error in verifyTeacherAccount controller: " + error);
        next(error);
    }
});

// remove the teacher account from the Organization
export const removeTeacherFromOrganization = expressAsyncHandler(async (req, res, next) => {
    try {
        const { teacherId, organizationId } = req.body;
        const user = req.user;

        // 1. Check if current user is admin of the organization
        const organization = await OrganizationModel.findById(organizationId);
        if (!organization) {
            return res.status(404).json({ message: "Organization not found" });
        }
        if (!organization.adminIds.includes(user.email)) {
            return res.status(403).json({ message: "Unauthorized: Only organization admin can verify teachers" });
        }

        // 2. Find the teacher and check if they belong to this organization
        const teacher = await UserModel.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        if (teacher.role !== "teacher") {
            return res.status(400).json({ message: "User is not a teacher" });
        }

        // 3. Find the organization entry in teacher.Organization array
        const orgIndex = teacher.Organization.findIndex(
            org => org.name.toString() === organizationId
        );
        if (orgIndex === -1) {
            return res.status(400).json({ message: "Teacher does not belong to this organization" });
        }

        // 4. Remove the organization entry from teacher.Organization array
        teacher.Organization.splice(orgIndex, 1);
        await teacher.save();

        return res.status(200).json({ message: "Teacher deleted successfully from the Organization" });
    } catch (error) {
        console.log("Error in deleteTeacher controller: " + error);
        next(error);
    }
});

// check for Organization Admin
export const isOrganizationAdmin = expressAsyncHandler(async (req, res, next) => {
    try {
        res.status(200).json({ isAdmin: true });
    } catch (error) {
        console.log("Error in isOrganizationAdmin middleware: " + error);
        next(error);
    }
});