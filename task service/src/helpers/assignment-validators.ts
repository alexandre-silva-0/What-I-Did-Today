import { body, param } from "express-validator";
import { getAssignmentById } from "../repositories/TaskRepository.js";

const STATUS = ['pending', 'in_progress', 'done']

// ---------- Regras reaproveitadas ----------

// :id precisa ser um inteiro positivo e existir no banco
const assignmentIdRule = param('id')
    .isInt({ min: 1 }).withMessage("ID inválido.")
    .bail()
    .custom(async (value) => {
        const assignment = await getAssignmentById(Number(value))

        if (!assignment) {
            throw new Error("Pendência não encontrada.")
        }

        return true
    })

const statusRule = body('status')
    .optional()
    .isIn(STATUS).withMessage(`Status inválido. Use: ${STATUS.join(', ')}.`)

// deadline é opcional: aceita ausente ou null (pendência sem prazo)
const deadlineRule = body('deadline')
    .optional({ values: 'null' })
    .isISO8601().withMessage("Prazo inválido. Use o formato AAAA-MM-DD.")

// ---------- Validações por rota ----------

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
    // PATCH sem nenhum campo conhecido não faz sentido
    body().custom((data) => {
        const fields = ['content', 'status', 'deadline']
        const hasField = fields.some((field) => data?.[field] !== undefined)

        if (!hasField) {
            throw new Error("Envie ao menos um campo para atualizar: content, status ou deadline.")
        }

        return true
    })
]

export const deleteAssignmentValidation = [
    assignmentIdRule
]
