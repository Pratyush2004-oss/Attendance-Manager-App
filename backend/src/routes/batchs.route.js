import express from 'express';
import { addStudentsByTeacher, addStudentUsingCode, createBatch, deleteBatch, deleteStudentFromBatch, getAllBatchesForStudent, getAllBatchesForTeacher, getAllBatchesofOrganization, getAllStudentList, getBatchByIdForTeacher, leaveBatch } from '../controllers/batches.controller.js';
import { AuthMiddleware, VerifyStudent, VerifyTeacher } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get("/get-student-list/:batchId", AuthMiddleware, VerifyTeacher, getAllStudentList);
router.post("/create-batch", AuthMiddleware, VerifyTeacher, createBatch);
router.post("/add-students-to-batch", AuthMiddleware, VerifyTeacher, addStudentsByTeacher);
router.post('/add-to-batch', AuthMiddleware, VerifyStudent, addStudentUsingCode);
router.put('/leave-batch', AuthMiddleware, VerifyStudent, leaveBatch);
router.put("/delete-student-from-batch", AuthMiddleware, VerifyTeacher, deleteStudentFromBatch);
router.get("/get-batches-for-teacher", AuthMiddleware, VerifyTeacher, getAllBatchesForTeacher);
router.get("/get-batch-By-id-for-teacher/:batchId", AuthMiddleware, VerifyTeacher, getBatchByIdForTeacher);
router.get("/get-batches-for-student", AuthMiddleware, VerifyStudent, getAllBatchesForStudent);
router.get("/get-all-batches-of-organization", AuthMiddleware, VerifyStudent, getAllBatchesofOrganization);
router.get("/delete-batch/:batchId", AuthMiddleware, VerifyTeacher, deleteBatch);


export default router;