import { ApiProperty } from '@nestjs/swagger'
import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
} from 'sequelize-typescript'
import { User } from 'src/users/users.model'
import { UserRoles } from './user-roles.model'

interface RoleCreationOptions {
    value: string
    description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationOptions> {
    @ApiProperty({ example: '1', description: 'unique identificator' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ApiProperty({ example: 'USER', description: 'Role name' })
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    value: string

    @ApiProperty({
        example: `user`,
        description: 'Role description',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}
