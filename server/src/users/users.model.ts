import { ApiProperty } from '@nestjs/swagger'
import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'

interface UserCreationOptions {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationOptions> {
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
    email: string

    @ApiProperty({
        example: `qwerty(don't use the same passwords)`,
        description: 'user password',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @ApiProperty({
        example: `false`,
        description: `banned property. This user violated some platform rules`,
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    banned: boolean

    @ApiProperty({
        example: `true`,
        description: 'user ban reason. Why this user was banned?',
    })
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
    })
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]
}
