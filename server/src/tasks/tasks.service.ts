import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UsersService } from 'src/users/users.service'
import { CreateTaskDto } from './dto/create-tasks.dto'
import { Task } from './tasks.model'

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task) private taskRepository: typeof Task,
        private usersService: UsersService
    ) {}
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

    public async getAllTasksById(id: number) {
        const tasks = await this.taskRepository.findAll({
            where: { projectId: id },
        })
        return tasks
    }

    public async removeTask(id: number) {
        const task = await this.taskRepository.destroy({
            where: { id },
        })
        return task
    }

    public async removeTasks(id: number) {
        const tasks = await this.taskRepository.destroy({
            where: { projectId: id },
        })
        return tasks
    }

    public async addAsignee(id: number, userId: number) {
        const asignee = await this.usersService.getUserById(userId)
        const task = await this.taskRepository.findOne({
            where: { id },
        })
        await task.$set('asignees', asignee.id)
        task.asignees = [asignee]
        return task
    }

    public async removeAsignee(id: number, userId: number) {
        const asignee = await this.usersService.getUserById(userId)
        const task = await this.taskRepository.findOne({
            where: { id },
        })
        await task.$remove('asignees', asignee.id)
        task.asignees = [asignee]
        return task
    }

    public async updateTask(id: number, form: Task) {
        const task = await this.taskRepository.findOne({
            where: { id },
        })
        await task.update(form)
        await task.save()
        return task
    }
}
