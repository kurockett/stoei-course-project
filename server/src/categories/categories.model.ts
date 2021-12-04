import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Project } from 'src/projects/projects.model'

interface CategoryCreationOptions {
    value: string
}

@Table({ tableName: 'categories', createdAt: false, updatedAt: false })
export class Category extends Model<Category, CategoryCreationOptions> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    value: string

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
    })
    projectId: number
}
