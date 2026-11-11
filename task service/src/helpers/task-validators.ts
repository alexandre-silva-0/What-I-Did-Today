import { body } from "express-validator";

export const createTaskValidation = [
    body('content')
        .notEmpty().withMessage("Num esquece da task, né, careca"),
    body('startedAt')
        .notEmpty().withMessage("A hora de início é obrigatória"),
    body('finishedAt')
]