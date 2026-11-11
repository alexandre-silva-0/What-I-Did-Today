import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'task',
    timestamps: false
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
    @Column(DataType.DATE)
    declare startedAt: string

    @AllowNull(true)
    @Column(DataType.DATE)
    declare finishedAt: string
}