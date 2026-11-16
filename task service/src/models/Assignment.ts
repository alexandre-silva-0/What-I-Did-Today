import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, AllowNull } from "sequelize-typescript";

@Table({
    tableName: 'assignment',
    timestamps: true
})

export class Assignment extends Model {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column(DataType.TEXT)
    declare content: string

    @AllowNull(false)
    @Column({
        type: DataType.ENUM('pending', 'in_progress', 'done'),
        defaultValue: 'pending'
    })
    declare status: 'pending' | 'in_progress' | 'done'

    @Column({ type: DataType.DATE })
    declare deadline: string
}