import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project } from './projects.model'

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project) private projectRepository: typeof Project
    ) {}

    public async createProject(dto: CreateProjectDto) {
        const project = await this.projectRepository.create(dto)
        return project
    }

    public async getAllProjects() {
        const labels = await this.projectRepository.findAll({
            include: { all: true },
        })
        return labels
    }
}
