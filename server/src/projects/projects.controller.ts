import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ProjectsService } from './projects.service'
import { Project } from './projects.model'
import { CreateProjectDto } from './dto/create-project.dto'

@Controller('api/projects')
export class ProjectsController {
    constructor(private projectService: ProjectsService) {}

    @ApiOperation({ summary: 'Project creation' })
    @ApiResponse({ status: 200, type: Project })
    @Post(':id')
    public createProject(
        @Body() projectDto: CreateProjectDto,
        @Param('id') id: number
    ) {
        return this.projectService.createProject(projectDto, id)
    }

    @ApiOperation({ summary: 'Get all projects from database' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get()
    public getAllProjects() {
        return this.projectService.getAllProjects()
    }

    @ApiOperation({ summary: 'Get all projects from database' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get('user/:id')
    public getAllUserProjects(@Param('id') id: number) {
        return this.projectService.getAllUserProjects(id)
    }

    @ApiOperation({ summary: 'Get all sorted projects from database' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get('user/:id/ordering=:order_by/')
    public getAllUserSortedProjects(
        @Param('id') id: number,
        @Param('order_by') orderBy: string
    ) {
        return this.projectService.getAllUserSortedProjects(id, orderBy)
    }

    @ApiOperation({ summary: 'Get project by id' })
    @ApiResponse({ status: 200, type: [Project] })
    @Get(':id')
    public getProjectById(@Param('id') id: number) {
        return this.projectService.getProjectById(id)
    }

    @ApiOperation({ summary: 'Add new asignee in current project' })
    @ApiResponse({ status: 200, type: [Project] })
    @Post('new_asignee/:id/:user_id')
    public addAsignee(
        @Param('id') id: number,
        @Param('user_id') userId: number
    ) {
        return this.projectService.addAsignee(id, userId)
    }

    @ApiOperation({ summary: 'Remove project' })
    @ApiResponse({ status: 200, type: [Project] })
    @Delete(':id')
    public removeProject(@Param('id') id: number) {
        return this.projectService.removeProject(id)
    }

    @ApiOperation({ summary: 'Update project' })
    @ApiResponse({ status: 200, type: [Project] })
    @Put(':id')
    public updateProject(@Param('id') id: number, @Body() form: Project) {
        return this.projectService.updateProject(id, form)
    }
}
