import express from 'express';
import { createOrganization, getAllTeachers, getOrganizationList, isOrganizationAdmin, removeTeacherFromOrganization, verifyTeacherAccount } from '../controllers/organization.controller.js';
import { AuthMiddleware, OrganizationAdmin, requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-organization', AuthMiddleware, requireAdmin, createOrganization);
router.get("/get-organization-list", getOrganizationList);
router.get("/verify-teachers/:teacherId", AuthMiddleware, OrganizationAdmin, verifyTeacherAccount);
router.get('/check-organization-admin', AuthMiddleware, OrganizationAdmin, isOrganizationAdmin);
router.get('/get-all-teacher-list', AuthMiddleware, OrganizationAdmin, getAllTeachers);
router.delete('/delete-teaher-account/:teacherId', AuthMiddleware, OrganizationAdmin, removeTeacherFromOrganization);
export default router;