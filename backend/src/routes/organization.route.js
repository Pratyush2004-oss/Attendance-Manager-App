import express from 'express';
import { createOrganization, getAllTeachersofOrganization, getOrganizationList, getOrganizationListByAdmin, isOrganizationAdmin, removeTeacherFromOrganization, verifyTeacherAccount } from '../controllers/organization.controller.js';
import { AuthMiddleware, OrganizationAdmin, requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-organization', AuthMiddleware, requireAdmin, createOrganization);
router.get("/get-organization-list", getOrganizationList);
router.get("/get-organizations-for-admins", AuthMiddleware, OrganizationAdmin, getOrganizationListByAdmin);
router.post("/verify-teachers", AuthMiddleware, OrganizationAdmin, verifyTeacherAccount);
router.get('/check-organization-admin', AuthMiddleware, OrganizationAdmin, isOrganizationAdmin);
router.get('/get-all-teacher-list/:organizationId', AuthMiddleware, OrganizationAdmin, getAllTeachersofOrganization);
router.delete('/delete-teaher-account', AuthMiddleware, OrganizationAdmin, removeTeacherFromOrganization);
export default router;