import { Body, Controller, Get, Post } from '@nestjs/common'
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
}
