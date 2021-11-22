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

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model<Role, RoleCreationOptions> {
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
        allowNull: false,
    })
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}
