//Dependencies
import { Router } from "express";

//controllers
import { createTask, updateTask, deleteTask } from "../controller/TaskController.js";

//helpers
import { createTaskValidation, updateTaskValidation } from "../helpers/task-validators.js";
import { validate } from "../helpers/handle-validations.js";

const router = Router()

router.post('/api/tasks/create', createTaskValidation, validate, createTask)
router.patch('/api/tasks/:id/update', updateTaskValidation, validate, updateTask)
router.delete('/api/tasks/:id/delete', updateTaskValidation, validate, deleteTask)

export default router  