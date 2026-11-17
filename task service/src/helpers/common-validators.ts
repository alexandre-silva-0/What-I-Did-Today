import { body, param } from "express-validator";

type FindById = (id: number) => Promise<unknown>

// :id precisa ser um inteiro positivo e existir no banco
export const existingIdRule = (findById: FindById, notFoundMessage: string) =>
    param('id')
        .isInt({ min: 1 }).withMessage("ID inválido.")
        .bail()
        .custom(async (value) => {
            const record = await findById(Number(value))

            if (!record) {
                throw new Error(notFoundMessage)
            }

            return true
        })

// PATCH precisa trazer pelo menos um dos campos editáveis
export const atLeastOneFieldRule = (fields: string[]) =>
    body().custom((data) => {
        const hasField = fields.some((field) => data?.[field] !== undefined)

        if (!hasField) {
            throw new Error(`Envie ao menos um campo para atualizar: ${fields.join(', ')}.`)
        }

        return true
    })
