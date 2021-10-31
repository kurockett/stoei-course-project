import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateLabelDto } from './dto/create-label.dto'
import { Label } from './labels.model'

@Injectable()
export class LabelsService {
    constructor(@InjectModel(Label) private labelRepository: typeof Label) {}

    public async createLabel(dto: CreateLabelDto) {
        const label = await this.labelRepository.create({ ...dto })
        return label
    }

    public async getAllLabels() {
        const labels = await this.labelRepository.findAll({
            include: { all: true },
        })
        return labels
    }
}
