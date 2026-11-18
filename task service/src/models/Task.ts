import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull, HasMany } from "sequelize-typescript";
import { Attachment } from "./Attachment.js";

@Table({
    tableName: 'task',
    timestamps: true
})

export class Task extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column(DataType.STRING)
    declare content: string

    @AllowNull(false)
    @Column(DataType.TIME)
    declare startedAt: string

    @AllowNull(true)
    @Column(DataType.TIME)
    declare finishedAt: string

    // Dia em que a tarefa aconteceu ("AAAA-MM-DD"); pode ser um dia anterior ao registro.
    // Aceita nulo só por causa das tarefas antigas, preenchidas em config/migrations.ts
    @AllowNull(true)
    @Column(DataType.DATEONLY)
    declare date: string

    // Apagar a tarefa apaga os registros dos anexos (os arquivos são apagados no controller)
    @HasMany(() => Attachment, { onDelete: 'CASCADE' })
    declare attachments: Attachment[]
}
