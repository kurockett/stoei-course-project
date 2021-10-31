import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateTaskDto } from './dto/create-tasks.dto'
import { Task } from './tasks.model'

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task) private taskRepository: typeof Task) {}
    public async createTask(dto: CreateTaskDto) {
        const task = await this.taskRepository.create(dto)
        return task
    }

    public async getAllTasks() {
        const tasks = await this.taskRepository.findAll({
            include: { all: true },
        })
        return tasks
    }
}
