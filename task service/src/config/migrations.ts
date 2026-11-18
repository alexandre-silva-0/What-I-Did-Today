import { DataType } from "sequelize-typescript";
import database from "./database.js";
import { Task } from "../models/Task.js";
import { toLocalDate } from "../helpers/date.js";

/**
 * Coluna "date" da tarefa (dia em que ela aconteceu).
 *
 * O sync() só cria tabelas novas; ele não adiciona colunas em tabelas que já
 * existem. Então, num banco antigo, a coluna é criada aqui e as tarefas
 * antigas recebem o dia do createdAt (convertido para o fuso do app).
 * Roda a cada start, mas só faz algo quando falta a coluna ou há tarefa sem dia.
 */
export const ensureTaskDateColumn = async () => {
    const queryInterface = database.getQueryInterface()
    const columns = await queryInterface.describeTable('task')

    if (!columns.date) {
        await queryInterface.addColumn('task', 'date', {
            type: DataType.DATEONLY,
            allowNull: true,
        })
        console.log('Coluna "date" adicionada na tabela task')
    }

    const withoutDate = await Task.findAll({
        where: { date: null },
        attributes: ['id', 'createdAt'],
        raw: true,
    })

    for (const task of withoutDate) {
        await Task.update({ date: toLocalDate(task.createdAt) }, { where: { id: task.id } })
    }

    if (withoutDate.length > 0) {
        console.log(`Dia preenchido em ${withoutDate.length} tarefa(s) antiga(s)`)
    }
}
