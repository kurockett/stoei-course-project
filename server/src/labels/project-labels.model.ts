import { ApiProperty } from '@nestjs/swagger'
import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript'
import { Label } from './labels.model'
import { Project } from '../projects/projects.model'

@Table({ tableName: 'project_labels', createdAt: false, updatedAt: false })
export class ProjectLabels extends Model<ProjectLabels> {
    @ApiProperty({ example: '1', description: 'unique identificator' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Label)
    @Column({ type: DataType.INTEGER })
    labelId: number

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER })
    projectId: number
}
