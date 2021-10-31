import { ApiProperty } from '@nestjs/swagger'
import { Task } from '../tasks/tasks.model'
import { User } from './users.model'
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'

@Table({ tableName: 'user_tasks', createdAt: false, updatedAt: false })
export class UserTasks extends Model<UserTasks> {
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

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
}
