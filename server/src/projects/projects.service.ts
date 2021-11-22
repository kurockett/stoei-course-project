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

    public async createProject(dto: CreateProjectDto) {
        const project = await this.projectRepository.create(dto)
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

    public async addAsignee(id: number) {
        const asignee = await this.usersService.getUserById(id)
        // const project = await this.projectRepository.get
        return asignee
    }

    public async addTask(id: number) {}
}
