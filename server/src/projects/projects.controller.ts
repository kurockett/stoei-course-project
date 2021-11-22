import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ProjectsService } from './projects.service'
import { Project } from './projects.model'
import { CreateProjectDto } from './dto/create-project.dto'

@Controller('api/projects/')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @ApiOperation({ summary: 'Project creation' })
    @ApiResponse({ status: 200, type: Project })
    @Post()
    public createProject(@Body() projectDto: CreateProjectDto) {
        return this.projectService.createProject(projectDto)
    }

    @ApiOperation({ summary: 'Get all projects from database' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get()
    public getAllProjects() {
        return this.projectService.getAllProjects()
    }

    @ApiOperation({ summary: 'Get project by id' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get(':id')
    public getProjectById(@Param('id') id: number) {
        return this.projectService.getProjectById(id)
    }

    @ApiOperation({ summary: 'Add new task in current project' })
    @ApiResponse({ status: 200, type: [Project] })
    @Post('/new_task/:id')
    public addTask(@Param('id') id: number) {
        return this.projectService.addTask(id)
    }

    @ApiOperation({ summary: 'Add new asignee in current project' })
    @ApiResponse({ status: 200, type: [Project] })
    @Post('/new_asignee/:id')
    public addAsignee(@Param('id') id: number) {
        return this.projectService.addAsignee(id)
    }
}
