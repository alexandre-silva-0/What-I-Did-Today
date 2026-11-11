import { body, param } from "express-validator";
import { getTaskById } from "../repositories/TaskRepository.js";
import { ITask } from "../dtos/tasks.dto.js";

export const createTaskValidation = [
    body('content')
        .notEmpty().withMessage("Num esquece da task, né, careca"),
    body('startedAt')
        .notEmpty().withMessage("A hora de início é obrigatória"),
    body('finishedAt')
]

export const updateTaskValidation = [
    param("id")
        .custom(async (value) => {
            const task = await getTaskById(parseInt(value))

            if (!task) {
                throw new Error("Task não encontrada.")
            }

            return
        })
]