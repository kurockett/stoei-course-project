import { ApiProperty } from '@nestjs/swagger'
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

@Table({ tableName: 'labels' })
export class Label extends Model<Label, LabelCreationOptions> {
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
