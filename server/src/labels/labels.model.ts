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

    @Column({ type: DataType.STRING })
    value: string

    @Column({ type: DataType.STRING })
    color: string

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
    })
    projectId: number
}
