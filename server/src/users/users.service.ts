import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from '../roles/roles.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {}

    public async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('ADMIN')
        await user.$set('roles', role.id)
        user.roles = [role]
        return user
    }

    public async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: { all: true },
        })
        return users
    }

    public async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        })
        return user
    }

    public async getUserWithoutPasswordByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true },
            attributes: {
                exclude: ['password'],
            },
        })
        return user
    }

    public async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
            include: { all: true },
        })
        return user
    }
}
