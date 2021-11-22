import {
    HasMany,
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
} from 'sequelize-typescript'
import { User } from '../users/users.model'
import { Task } from '../tasks/tasks.model'
import { UserProjects } from './user-projects.model'

interface ProjectCreationOptions {
    name: string
    description: string
}

@Table({ tableName: 'projects' })
export class Project extends Model<Project, ProjectCreationOptions> {
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
    name: string

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    description: string

    @BelongsToMany(() => User, () => UserProjects)
    asignees: User[]

    @HasMany(() => Task)
    tasks: Task[]
}
