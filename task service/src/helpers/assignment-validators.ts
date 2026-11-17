import { body } from "express-validator";
import { getAssignmentById } from "../repositories/TaskRepository.js";
import { atLeastOneFieldRule, existingIdRule } from "./common-validators.js";

const STATUS = ['pending', 'in_progress', 'done']

const assignmentIdRule = existingIdRule(getAssignmentById, "Pendência não encontrada.")

const statusRule = body('status')
    .optional()
    .isIn(STATUS).withMessage(`Status inválido. Use: ${STATUS.join(', ')}.`)

const deadlineRule = body('deadline')
    .optional({ values: 'null' })
    .isISO8601().withMessage("Prazo inválido. Use o formato AAAA-MM-DD.")

export const createAssignmentValidation = [
    body('content')
        .exists().withMessage("A descrição da pendência é obrigatória.")
        .bail()
        .isString().withMessage("A descrição precisa ser um texto.")
        .bail()
        .trim()
        .notEmpty().withMessage("A descrição da pendência é obrigatória."),
    statusRule,
    deadlineRule
]

export const updateAssignmentValidation = [
    assignmentIdRule,
    body('content')
        .optional()
        .isString().withMessage("A descrição precisa ser um texto.")
        .bail()
        .trim()
        .notEmpty().withMessage("A descrição não pode ficar vazia."),
    statusRule,
    deadlineRule,
    atLeastOneFieldRule(['content', 'status', 'deadline'])
]

export const getAssignmentValidation = [assignmentIdRule]

export const deleteAssignmentValidation = [assignmentIdRule]
