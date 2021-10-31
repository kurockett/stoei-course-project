import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { Task } from '../tasks/tasks.model'
import { Label } from '../labels/labels.model'
import { Project } from './projects.model'

@Module({
    controllers: [ProjectsController],
    providers: [ProjectsService],
    imports: [SequelizeModule.forFeature([Project, Task, Label])],
})
export class ProjectsModule {}
