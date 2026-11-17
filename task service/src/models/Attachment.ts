import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull, ForeignKey } from "sequelize-typescript";
import { Task } from "./Task.js";

@Table({
    tableName: 'attachment',
    timestamps: true
})

export class Attachment extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @ForeignKey(() => Task)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare taskId: number

    // Nome do arquivo como veio do celular/computador (só para exibir)
    @AllowNull(false)
    @Column(DataType.STRING)
    declare originalName: string

    // Nome gerado no servidor (uuid + extensão): é o arquivo dentro da pasta de uploads
    @AllowNull(false)
    @Column(DataType.STRING)
    declare storedName: string

    @AllowNull(false)
    @Column(DataType.STRING)
    declare mimeType: string

    // Tamanho em bytes
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare size: number
}
