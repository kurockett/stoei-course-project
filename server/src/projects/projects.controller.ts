import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ProjectsService } from './projects.service'
import { Project } from './projects.model'
import { CreateProjectDto } from './dto/create-project.dto'

@Controller('api/projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @ApiOperation({ summary: 'Project creation' })
    @ApiResponse({ status: 200, type: Project })
    @Post()
    public createProject(@Body() projectDto: CreateProjectDto) {
        return this.projectService.createProject(projectDto)
    }

    @ApiOperation({ summary: 'Get all labels from database' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get()
    public getAllProjects() {
        return this.projectService.getAllProjects()
    }
}
