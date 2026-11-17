//Dependencies
import { Router } from "express";

//controllers
import {
    createTask, updateTask, deleteTask,
    getTasks, getTaskId, createAssignment, updateAssignment, deleteAssignment,
    getAssignments
} from "../controller/TaskController.js";

//helpers
import { createTaskValidation, updateTaskValidation } from "../helpers/task-validators.js";
import { validate } from "../helpers/handle-validations.js";
import {
    createAssignmentValidation, updateAssignmentValidation, deleteAssignmentValidation
} from "../helpers/assignment-validators.js";

const router = Router()

router.post('/api/tasks', createTaskValidation, validate, createTask)
router.patch('/api/tasks/:id', updateTaskValidation, validate, updateTask)
router.delete('/api/tasks/:id', updateTaskValidation, validate, deleteTask)
router.get('/api/tasks', getTasks)
router.get('/api/tasks/:id', getTaskId)
router.post('/api/assignments', createAssignmentValidation, validate, createAssignment)
router.patch('/api/assignments/:id', updateAssignmentValidation, validate, updateAssignment)
router.delete('/api/assignments/:id', deleteAssignmentValidation, validate, deleteAssignment)
router.get('/api/assignments', getAssignments)

export default router  