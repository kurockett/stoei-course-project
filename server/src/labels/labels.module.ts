import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Project } from '../projects/projects.model'
import { LabelsController } from './labels.controller'
import { LabelsService } from './labels.service'
import { Label } from './labels.model'

@Module({
    controllers: [LabelsController],
    providers: [LabelsService],
    imports: [SequelizeModule.forFeature([Project, Label])],
    exports: [LabelsService],
})
export class LabelsModule {}
