import {
    BelongsToMany,
    Column,
    DataType,
    Model,
    Table,
} from 'sequelize-typescript'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'
import { UserProjects } from '../projects/user-projects.model'
import { Project } from 'src/projects/projects.model'
import { Task } from '../tasks/tasks.model'
import { UserTasks } from '../tasks/user-tasks.model'

interface UserCreationOptions {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationOptions> {
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
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @BelongsToMany(() => Project, () => UserProjects)
    projects: Project[]

    @BelongsToMany(() => Task, () => UserTasks)
    tasks: Task[]
}
