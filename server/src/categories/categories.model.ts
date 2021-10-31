import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface CategoryCreationOptions {
    value: string
}

@Table({ tableName: 'categories' })
export class Category extends Model<Category, CategoryCreationOptions> {
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
}
