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

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    imports: [
        SequelizeModule.forFeature([Project, Task, Label, UserProjects, User]),
        UsersModule,
        TasksModule,
    ],
})
export class ProjectsModule {}
