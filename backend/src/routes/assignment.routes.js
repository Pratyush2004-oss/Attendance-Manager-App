import express from 'express';
import { AuthMiddleware, VerifyStudent, VerifyTeacher } from '../middleware/auth.middleware.js';
import { createAssignment, deleteAssignment, getAllAssignmentsofToday, getAssignment } from '../controllers/assignment.controller.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post("/create-assignment", AuthMiddleware, VerifyTeacher, upload.array('files', 2), createAssignment);
router.get("/get-assignment/:batchId", AuthMiddleware, VerifyStudent, getAssignment);
router.delete('/delete-assignment/:assignmentId', AuthMiddleware, VerifyTeacher, deleteAssignment);
router.get("/get-assignments-of-today", AuthMiddleware, VerifyStudent, getAllAssignmentsofToday);
export default router;