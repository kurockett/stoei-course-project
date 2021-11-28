import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateTaskDto } from './dto/create-tasks.dto'
import { TasksService } from './tasks.service'
import { Task } from './tasks.model'
@Controller('api/tasks/')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @ApiOperation({ summary: 'Task creation' })
    @ApiResponse({ status: 200, type: Task })
    @Post()
    public createTask(@Body() taskDto: CreateTaskDto) {
        return this.taskService.createTask(taskDto)
    }

    @ApiOperation({ summary: 'Get all tasks from database' })
    @ApiResponse({ status: 200, type: [Task] })
    @Get()
    public getAllTasks() {
        return this.taskService.getAllTasks()
    }

    @ApiOperation({ summary: 'Get all tasks by id from database' })
    @ApiResponse({ status: 200, type: [Task] })
    @Get(':id')
    public getAllTasksById(@Param('id') id: number) {
        return this.taskService.getAllTasksById(id)
    }

    @ApiOperation({ summary: 'Get all tasks from database' })
    @ApiResponse({ status: 200, type: [Task] })
    @Delete(':id')
    public removeTask(@Param('id') id: number) {
        return this.taskService.removeTask(id)
    }

    @ApiOperation({ summary: 'Add new asignee for current task' })
    @ApiResponse({ status: 200, type: [Task] })
    @Post('/new_asignee/:id/:user_id')
    public addAsignee(
        @Param('id') id: number,
        @Param('user_id') userId: number
    ) {
        return this.taskService.addAsignee(id, userId)
    }

    @ApiOperation({ summary: 'Add new asignee for current task' })
    @ApiResponse({ status: 200, type: [Task] })
    @Delete('/new_asignee/:id/:user_id')
    public removeAsignee(
        @Param('id') id: number,
        @Param('user_id') userId: number
    ) {
        return this.taskService.removeAsignee(id, userId)
    }

    @ApiOperation({ summary: 'Update task' })
    @ApiResponse({ status: 200, type: [Task] })
    @Put(':id')
    public updateTask(@Param('id') id: number, @Body() form: Task) {
        return this.taskService.updateTask(id, form)
    }
}
