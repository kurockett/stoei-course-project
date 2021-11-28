import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { UsersService } from './users.service'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'

@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'User creation' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    public createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({ summary: 'Get all users from database' })
    @ApiResponse({ status: 200, type: [User] })
    // @Roles('ADMIN')
    // @UseGuards(RolesGuard)
    @Get()
    public getAllUsers() {
        return this.usersService.getAllUsers()
    }
}
