import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProjectDto } from './dto/create-project.dto'
import { Project } from './projects.model'
import { UsersService } from '../users/users.service'
import { TasksService } from '../tasks/tasks.service'
import { LabelsService } from 'src/labels/labels.service'
import { CategoriesService } from '../categories/categories.service'
import { CreateCategoryDto } from '../categories/dto/create-category.dto'
import { User } from 'src/users/users.model'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { CreateLabelDto } from '../labels/dto/create-label.dto'
import { Label } from '../labels/labels.model'
import { Task } from '../tasks/tasks.model'
import { Category } from '../categories/categories.model'

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Project) private projectRepository: typeof Project,
        private usersService: UsersService,
        private tasksService: TasksService,
        private labelsService: LabelsService,
        private categoriesService: CategoriesService
    ) {}

    public async createProject(dto: CreateProjectDto, id: number) {
        const candidate = await this.projectRepository.findOne({
            where: {
                name: dto.name,
            },
        })
        if (candidate) {
            throw new HttpException(
                `Такой проект уже существует!`,
                HttpStatus.BAD_REQUEST
            )
        }
        const project = await this.projectRepository.create(dto)
        const user = await this.usersService.getUserById(id)
        await project.$set('asignees', user.id)
        project.asignees = [user]
        const categories: CreateCategoryDto[] = [
            { value: 'In Process', projectId: project.id },
            { value: 'Completed', projectId: project.id },
        ]
        categories.forEach(async (category: CreateCategoryDto) => {
            await this.categoriesService.createCategory(category)
        })
        const labels: CreateLabelDto[] = [
            { value: 'bug', color: '#ab0a0a', projectId: project.id },
            { value: 'feature', color: '#2efa00', projectId: project.id },
        ]
        labels.forEach(async (label: CreateLabelDto) => {
            await this.labelsService.createLabel(label)
        })
        return project
    }

    public async getAllProjects() {
        const projects = await this.projectRepository.findAll({
            include: [
                {
                    model: User,
                    as: 'asignees',
                    attributes: {
                        exclude: ['password'],
                    },
                },
                {
                    model: Label,
                    as: 'labels',
                },
                {
                    model: Task,
                    as: 'tasks',
                    include: [
                        {
                            model: User,
                            as: 'asignees',
                        },
                    ],
                },
                {
                    model: Category,
                    as: 'categories',
                },
            ],
        })
        return projects
    }

    public async getProjectById(id: number) {
        const project = await this.projectRepository.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    as: 'asignees',
                    attributes: {
                        exclude: ['password'],
                    },
                    through: { attributes: [] },
                },
                {
                    model: Label,
                    as: 'labels',
                },
                {
                    model: Task,
                    as: 'tasks',
                    include: [
                        {
                            model: User,
                            as: 'asignees',
                        },
                    ],
                },
                {
                    model: Category,
                    as: 'categories',
                },
            ],
        })
        return project
    }

    public async addAsignee(id: number, userId: number) {
        const asignee = await this.usersService.getUserById(userId)
        const project = await this.projectRepository.findOne({
            where: { id },
        })
        await asignee.$set('projects', project.id)
        asignee.projects = [project]
        return project
    }

    public async removeProject(id: number) {
        await this.labelsService.removeLabels(id)
        await this.categoriesService.removeCategories(id)
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
            include: [
                {
                    model: User,
                    as: 'asignees',
                    attributes: {
                        exclude: ['password'],
                    },
                    through: { attributes: [] },
                    where: { id },
                },
                {
                    model: Label,
                    as: 'labels',
                },
                {
                    model: Task,
                    as: 'tasks',
                    include: [
                        {
                            model: User,
                            as: 'asignees',
                        },
                    ],
                },
                {
                    model: Category,
                    as: 'categories',
                },
            ],
        })
        return projects
    }

    public async getAllUserSortedProjects(id: number, orderBy: string) {
        const validParams: string[] = [
            'id',
            'name',
            'description',
            'createdAt',
            'updatedAt',
        ]
        const descCondition: boolean = orderBy.charAt(0) === '-'
        const newOrderBy = descCondition ? orderBy.slice(1) : orderBy
        const order = descCondition ? 'DESC' : 'ASC'
        if (!validParams.includes(newOrderBy)) {
            throw new HttpException(
                `Не валидный параметр`,
                HttpStatus.BAD_REQUEST
            )
        }
        const projects = await this.projectRepository.findAll({
            include: [
                {
                    model: User,
                    as: 'asignees',
                    attributes: {
                        exclude: ['password'],
                    },
                    through: { attributes: [] },
                    where: { id },
                },
                {
                    model: Label,
                    as: 'labels',
                },
                {
                    model: Task,
                    as: 'tasks',
                    include: [
                        {
                            model: User,
                            as: 'asignees',
                        },
                    ],
                },
                {
                    model: Category,
                    as: 'categories',
                },
            ],
            order: [[newOrderBy, order]],
        })
        return projects
    }
}
