import expressAsyncHandler from "express-async-handler";
import OrganizationModel from "../models/organization.model.js";
import UserModel from "../models/auth.model.js";

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

// get list of all teachers of the Organization for Organization admin 
export const getAllTeachers = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        const teachers = await UserModel
            .find({ role: "teacher", isVerified: true, Organization: { $in: user.Organization } })
            .select("_id name email isTeacherVerified")
            .sort({ isTeacherVerified: -1 });
        return res.status(200).json({ teachers });
    } catch (error) {
        console.log("Error in getAllTeachers controller: " + error);
        next(error);
    }
})

// verify teacher by the admin of the organization
export const verifyTeacherAccount = expressAsyncHandler(async (req, res, next) => {
    try {
        const { teacherId } = req.params;
        const user = req.user;
        const teacher = await UserModel.findById(teacherId).populate("Organization", "name _id");
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // check whether the Organization fo the teacher is as same as the Organization of the admin
        const isSubset = user.Organization.every(org => teacher.Organization.some(userOrg => userOrg._id.equals(org._id)))
            || teacher.Organization.every(org => user.Organization.some(teacherOrg => teacherOrg._id.equals(org._id)));

        if (!isSubset) {
            return res.status(400).json({ message: "Unauthorized, access denied" });
        }

        // check whether the teacher is already verified
        if (teacher.isTeacherVerified) {
            return res.status(400).json({ message: "Teacher already verified" });
        }

        teacher.isTeacherVerified = true;
        await teacher.save();
        return res.status(200).json({ message: "Teacher verified successfully" });
    } catch (error) {
        console.log("Error in verifyTeacher controller: " + error);
        next(error);
    }
})

// remove the teacher account from the Organization
export const removeTeacherFromOrganization = expressAsyncHandler(async (req, res, next) => {
    try {
        const { teacherId } = req.params;
        const user = req.user;
        const teacher = await UserModel.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // check whether the Organization fo the teacher is as same as the Organization of the admin
        const isSubset = user.Organization.every(org => teacher.Organization.some(userOrg => userOrg._id.equals(org._id)))
            || teacher.Organization.every(org => user.Organization.some(teacherOrg => teacherOrg._id.equals(org._id)));

        if (!isSubset) {
            return res.status(400).json({ message: "Unauthorized, access denied" });
        }

        if (teacher.Organization.length === 1) {
            await teacher.deleteOne();
            return res.status(200).json({ message: "Teacher deleted successfully from the Organization" });
        }

        // remove the ORganization di fromm the ORganization array of the teacher
        teacher.Organization.pull(user.Organization);
        await teacher.save();

        return res.status(200).json({ message: "Teacher deleted successfully from the Organization" });
    } catch (error) {
        console.log("Error in deleteTeacher controller: " + error);
        next(error);
    }
})

// check for Organization Admin
export const isOrganizationAdmin = expressAsyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        const organization = await OrganizationModel.findById(user.Organization);
        if (!organization) {
            return res.status(401).json({ error: "Unauthorized, Organization not found" });
        }
        const isAdmin = organization.adminIds.includes(user.email);
        if (!isAdmin) {
            return res.status(401).json({ error: "Unauthorized, access denied" });
        }
        res.status(200).json({ isAdmin });
    } catch (error) {
        console.log("Error in isOrganizationAdmin middleware: " + error);
        next(error);
    }
})