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
    @ApiProperty({ example: '1', description: 'unique identificator' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    value: string

    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    description: string

    @ForeignKey(() => Project)
    @Column({
        type: DataType.STRING,
    })
    projectId: number

    @BelongsTo(() => Project)
    project: Project
}
