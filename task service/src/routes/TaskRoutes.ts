//Dependencies
import { Router } from "express";

//controllers
import {
    createTask, updateTask, deleteTask,
    getTasks, getTaskId, createAssignment, updateAssignment, deleteAssignment,
    getAssignments, getAssignmentId
} from "../controller/TaskController.js";

//helpers
import {
    createTaskValidation, updateTaskValidation, deleteTaskValidation, getTaskValidation
} from "../helpers/task-validators.js";
import { validate } from "../helpers/handle-validations.js";
import {
    createAssignmentValidation, updateAssignmentValidation, deleteAssignmentValidation, getAssignmentValidation
} from "../helpers/assignment-validators.js";

const router = Router()

router.post('/api/tasks', createTaskValidation, validate, createTask)
router.patch('/api/tasks/:id', updateTaskValidation, validate, updateTask)
router.delete('/api/tasks/:id', deleteTaskValidation, validate, deleteTask)
router.get('/api/tasks', getTasks)
router.get('/api/tasks/:id', getTaskValidation, validate, getTaskId)
router.post('/api/assignments', createAssignmentValidation, validate, createAssignment)
router.patch('/api/assignments/:id', updateAssignmentValidation, validate, updateAssignment)
router.delete('/api/assignments/:id', deleteAssignmentValidation, validate, deleteAssignment)
router.get('/api/assignments', getAssignments)
router.get('/api/assignments/:id', getAssignmentValidation, validate, getAssignmentId)

export default router  