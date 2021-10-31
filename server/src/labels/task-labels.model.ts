import { ApiProperty } from '@nestjs/swagger'
import { Task } from '../tasks/tasks.model'
import { Label } from './labels.model'
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'

@Table({ tableName: 'task_labels', createdAt: false, updatedAt: false })
export class TaskLabels extends Model<TaskLabels> {
    @ApiProperty({ example: '1', description: 'unique identificator' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Task)
    @Column({ type: DataType.INTEGER })
    taskId: number

    @ForeignKey(() => Label)
    @Column({ type: DataType.INTEGER })
    labelId: number
}
