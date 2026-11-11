//Dependencies
import { Router } from "express";

//controllers
import { createTask } from "../controller/TaskController.js";

//helpers
import { createTaskValidation } from "../helpers/task-validators.js";
import { validate } from "../helpers/handle-validations.js";


const router = Router()


router.post('/api/tasks/create', createTaskValidation, validate, createTask)

export default router  