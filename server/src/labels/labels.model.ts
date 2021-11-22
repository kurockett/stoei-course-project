import {
    Column,
    DataType,
    Model,
    Table,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript'
import { Project } from 'src/projects/projects.model'

interface LabelCreationOptions {
    value: string
    color: string
    projectId: number
}

@Table({ tableName: 'labels', createdAt: false, updatedAt: false })
export class Label extends Model<Label, LabelCreationOptions> {
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
        unique: true,
        allowNull: false,
    })
    color: string

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        unique: true,
        allowNull: false,
    })
    projectId: number

    @BelongsTo(() => Project)
    project: Project
}
