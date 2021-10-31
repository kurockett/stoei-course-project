import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { Category } from './categories.model'

@Controller('api/categories')
export class CategoriesController {
    constructor(private catergoryService: CategoriesService) {}

    @ApiOperation({ summary: 'Category creation' })
    @ApiResponse({ status: 200, type: Category })
    @Post()
    public createProject(@Body() projectDto: CreateCategoryDto) {
        return this.catergoryService.createCategory(projectDto)
    }

    @ApiOperation({ summary: 'Get all categories from database' })
    @ApiResponse({ status: 200, type: [Category] })
    @Get()
    public getAllProjects() {
        return this.catergoryService.getAllCategories()
    }
}
