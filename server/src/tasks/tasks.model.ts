import { ApiProperty } from '@nestjs/swagger'
import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript'
import { Project } from '../projects/projects.model'

interface TaskCreationOptions {
    value: string
    description: string
    projectId: number
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationOptions> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    value: string

    @Column({
        type: DataType.STRING,
        defaultValue: '',
    })
    description: string

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
        defaultValue: 0,
    })
    estimate: number

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
    })
    projectId: number

    @BelongsTo(() => Project)
    project: Project
}
