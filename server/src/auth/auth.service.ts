import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'
import { User } from '../users/users.model'
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    public async signIn(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    public async signUp(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        if (candidate) {
            throw new HttpException(
                `Пользователь с таким email уже существует!`,
                HttpStatus.BAD_REQUEST
            )
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 6)
        const user = await this.userService.createUser({
            ...userDto,
            password: hashedPassword,
        })
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        const userWithoutPassword =
            await this.userService.getUserWithoutPasswordByEmail(payload.email)
        return {
            token: this.jwtService.sign(payload),
            user: userWithoutPassword,
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        if (!user) {
            throw new UnauthorizedException({
                message: 'Некорректный email или пароль',
            })
        }
        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password
        )
        if (!passwordEquals) {
            throw new UnauthorizedException({
                message: 'Некорректный email или пароль',
            })
        }
        return user
    }
}
