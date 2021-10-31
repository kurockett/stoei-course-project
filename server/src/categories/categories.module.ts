import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { Category } from './categories.model'
import { CategoryTasks } from '../tasks/category-tasks.model'

@Module({
    controllers: [CategoriesController],
    providers: [CategoriesService],
    imports: [SequelizeModule.forFeature([Category, CategoryTasks])],
})
export class CategoriesModule {}
