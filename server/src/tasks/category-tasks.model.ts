import { ApiProperty } from '@nestjs/swagger'
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Task } from './tasks.model'
import { Category } from '../categories/categories.model'

@Table({ tableName: 'category_tasks', createdAt: false, updatedAt: false })
export class CategoryTasks extends Model<CategoryTasks> {
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

    @ForeignKey(() => Category)
    @Column({ type: DataType.INTEGER })
    categoryId: number
}
