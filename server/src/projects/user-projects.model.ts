import { User } from 'src/users/users.model'
import { Project } from './projects.model'
import {
    Column,
    DataType,
    Model,
    Table,
    ForeignKey,
} from 'sequelize-typescript'

@Table({ tableName: 'user_projects', createdAt: false, updatedAt: false })
export class UserProjects extends Model<UserProjects> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER })
    projectId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
}
