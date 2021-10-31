import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { LabelsService } from './labels.service'
import { CreateLabelDto } from './dto/create-label.dto'
import { Label } from './labels.model'

@Controller('api/labels')
export class LabelsController {
    constructor(private labelsService: LabelsService) {}

    @ApiOperation({ summary: 'User creation' })
    @ApiResponse({ status: 200, type: Label })
    @Post()
    public createUser(@Body() labelDto: CreateLabelDto) {
        return this.labelsService.createLabel(labelDto)
    }

    @ApiOperation({ summary: 'Get all labels from database' })
    @ApiResponse({ status: 200, type: [Label] })
    @Get()
    public getAllLabels() {
        return this.labelsService.getAllLabels()
    }
}
