import { CategoriesModule } from './../categories/categories.module'
import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { Task } from '../tasks/tasks.model'
import { Label } from '../labels/labels.model'
import { Project } from './projects.model'
import { User } from '../users/users.model'
import { UserProjects } from './user-projects.model'
import { UsersModule } from '../users/users.module'
import { TasksModule } from '../tasks/tasks.module'
import { LabelsModule } from '../labels/labels.module'
import { Category } from '../categories/categories.model'

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    imports: [
        SequelizeModule.forFeature([
            Project,
            Task,
            Label,
            UserProjects,
            User,
            Label,
            Category,
        ]),
        UsersModule,
        TasksModule,
        LabelsModule,
        CategoriesModule,
    ],
})
export class ProjectsModule {}
