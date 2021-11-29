import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project } from './projects.model'
import { UsersService } from '../users/users.service'
import { TasksService } from '../tasks/tasks.service'

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project) private projectRepository: typeof Project,
        private usersService: UsersService,
        private tasksService: TasksService
    ) {}

    public async createProject(dto: CreateProjectDto, id: number) {
        const project = await this.projectRepository.create(dto)
        const user = await this.usersService.getUserById(id)
        await project.$set('asignees', user.id)
        project.asignees = [user]
        return project
    }

    public async getAllProjects() {
        const projects = await this.projectRepository.findAll({
            include: { all: true },
        })
        return projects
    }

    public async getProjectById(id: number) {
        const project = await this.projectRepository.findOne({
            where: { id },
            include: { all: true },
        })
        return project
    }

    public async addAsignee(id: number, userId: number) {
        const asignee = await this.usersService.getUserById(userId)
        const project = await this.projectRepository.findOne({
            where: { id },
        })
        await project.$set('asignees', asignee.id)
        project.asignees = [asignee]
        return project
    }

    public async removeProject(id: number) {
        await this.tasksService.removeTasks(id)
        await this.projectRepository.destroy({
            where: { id },
        })
    }

    public async updateProject(id: number, form: Project) {
        const project = await this.projectRepository.findOne({
            where: { id },
        })
        await project.update(form)
        await project.save()
        return project
    }

    public async getAllUserProjects(id: number) {
        const projects = await this.projectRepository.findAll({
            where: {
                asignees: { id },
            },
            include: { all: true },
        })
        return projects
    }
}
