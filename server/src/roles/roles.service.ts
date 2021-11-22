import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './roles.model'

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
    public async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto)
        return role
    }

    public async getAllRoles() {
        const roles = await this.roleRepository.findAll({
            include: { all: true },
        })
        return roles
    }

    public async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({ where: { value } })
        return role
    }
}
