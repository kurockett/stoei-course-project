import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { Task } from './tasks.model'
import { Project } from '../projects/projects.model'
import { TaskLabels } from 'src/labels/task-labels.model'
import { Category } from 'src/categories/categories.model'
import { CategoryTasks } from './category-tasks.model'
import { User } from '../users/users.model'
import { UserTasks } from './user-tasks.model'
import { UsersModule } from '../users/users.module'

@Module({
    controllers: [TasksController],
    providers: [TasksService],
    imports: [
        SequelizeModule.forFeature([
            Project,
            Task,
            TaskLabels,
            Category,
            CategoryTasks,
            User,
            UserTasks,
        ]),
        UsersModule,
        TasksModule,
    ],
    exports: [TasksService],
})
export class TasksModule {}
