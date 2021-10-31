import { ApiProperty } from '@nestjs/swagger'
import { HasMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { Task } from '../tasks/tasks.model'

interface ProjectCreationOptions {
    name: string
    description: string
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationOptions> {
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
    name: string

    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    description: string

    @HasMany(() => Task)
    tasks: Task[]
}
