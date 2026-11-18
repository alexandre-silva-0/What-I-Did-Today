import { body } from "express-validator";
import { getAttachmentById, getTaskById } from "../repositories/TaskRepository.js";
import { atLeastOneFieldRule, existingIdRule } from "./common-validators.js";
import { todayLocal } from "./date.js";

const MAX_CONTENT = 255

// "HH:MM" ou "HH:MM:SS", de 00:00 a 23:59
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/

const taskIdRule = existingIdRule(getTaskById, "Task não encontrada.")

const contentRule = (required: boolean) => {
    const chain = body('content')
    if (required) chain.exists().withMessage("Num esquece da task, né, careca").bail()
    else chain.optional()

    return chain
        .isString().withMessage("A descrição precisa ser um texto.")
        .bail()
        .trim()
        .notEmpty().withMessage("Num esquece da task, né, careca")
        .isLength({ max: MAX_CONTENT }).withMessage(`A descrição pode ter no máximo ${MAX_CONTENT} caracteres.`)
}

const startedAtRule = (required: boolean) => {
    const chain = body('startedAt')
    if (required) chain.exists().withMessage("A hora de início é obrigatória").bail()
    else chain.optional()

    return chain.matches(TIME_REGEX).withMessage("Hora de início inválida. Use o formato HH:MM.")
}

// Dia da tarefa ("AAAA-MM-DD"). No create é opcional (sem ele vale hoje);
// no update, se vier, precisa ser uma data válida. Nunca no futuro
const dateRule = (allowNull: boolean) =>
    body('date')
        .optional(allowNull ? { values: 'null' } : undefined)
        .isDate({ format: 'YYYY-MM-DD', strictMode: true }).withMessage("Data inválida. Use o formato AAAA-MM-DD.")
        .bail()
        .custom((value: string) => {
            if (value > todayLocal()) {
                throw new Error("Não dá para registrar tarefas em dias futuros.")
            }
            return true
        })

// finishedAt pode ficar vazio: tarefa em andamento
const finishedAtRule = body('finishedAt')
    .optional({ values: 'null' })
    .matches(TIME_REGEX).withMessage("Hora de fim inválida. Use o formato HH:MM.")

export const createTaskValidation = [
    contentRule(true),
    dateRule(true),
    startedAtRule(true),
    finishedAtRule
]

export const updateTaskValidation = [
    taskIdRule,
    contentRule(false),
    dateRule(false),
    startedAtRule(false),
    finishedAtRule,
    atLeastOneFieldRule(['content', 'date', 'startedAt', 'finishedAt'])
]

export const getTaskValidation = [taskIdRule]

export const deleteTaskValidation = [taskIdRule]

export const uploadAttachmentsValidation = [taskIdRule]

export const attachmentIdValidation = [existingIdRule(getAttachmentById, "Anexo não encontrado.")]
