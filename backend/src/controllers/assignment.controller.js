import expressasyncHandler from 'express-async-handler';
import BatchModel from '../models/batches.model.js';
import AssignmentModel from '../models/assignment.model.js';

// create homework by the teacher of that batch
export const createAssignment = expressasyncHandler(async (req, res, next) => {
    try {
        const { batchId, homework } = req.body;
        const user = req.user;

        if (!batchId || !homework || !Array.isArray(homework) || homework.length === 0) {
            return res.status(400).json({ error: "All fields are required.." });
        }

        const batch = await BatchModel.findById(batchId);
        if (!batch) {
            return res.status(404).json({ error: "Batch not found" });
        }

        // check if the current user is the teacher of that batch or not
        if (batch.teacherId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to mark attendance for this batch" });
        }

        // add homework to the database
        await AssignmentModel.create({
            batchId,
            homework
        });

        res.status(201).json({ message: "Assignment Added successfully" });
    } catch (error) {
        console.log("Error in create-assignment controller: " + error);
        next(error);
    }
});

// get homework of the perticular batch for the students
export const getAssignment = expressasyncHandler(async (req, res, next) => {
    try {
        const user = req.user;
        const { batchId } = req.params;

        if (!batchId) {
            return res.status(400).json({ message: "BatchId is required" });
        }

        // check if the user is the student of that batch or not
        const batch = await BatchModel.findById(batchId);
        if (!batch) {
            return res.status(404).json({ message: "Batch not found" });
        }

        if(!batch.students.includes(user._id)){
            return res.status(400).json({ message: "You are not a student of this batch" });
        }

        const assignment = await AssignmentModel.find({ batchId }).sort({ createdAt: -1 });
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        return res.status(200).json({ assignment });

    } catch (error) {
        console.log("Error in get-assignment controller : " + error);
    }

})

// delete homeWork 
export const deleteAssignment = expressasyncHandler(async (req, res, next) => {
    try {
        const { assignmentId } = req.params;
        const assignment = await AssignmentModel.findByIdAndDelete(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }
        return res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (error) {
        console.log("Error in delete-assignment controller: " + error);
        next(error);
    }
})