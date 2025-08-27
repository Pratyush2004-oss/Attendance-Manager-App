import express from 'express';
import { AuthMiddleware, VerifyStudent, VerifyTeacher } from '../middleware/auth.middleware.js';
import { createAssignment, deleteAssignment, getAssignment } from '../controllers/assignment.controller.js';

const router = express.Router();

router.post("/create-assignment",AuthMiddleware, VerifyTeacher, createAssignment);
router.get("/get-assignment", AuthMiddleware, getAssignment);
router.delete('/delete-assignment/:assignmentId', AuthMiddleware, VerifyTeacher, deleteAssignment);

export default router;