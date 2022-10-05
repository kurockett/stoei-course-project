import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  public createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Get all users from database' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  public getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get all users from database' })
  @ApiResponse({ status: 200, type: [User] })
  @Get(':id')
  public getUserById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Get all users from database with role=user' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('/role/user')
  public getAllUserRoleUsers() {
    return this.usersService.getAllUserRoleUsers();
  }

  @ApiOperation({ summary: 'Remove users by id from database' })
  @ApiResponse({ status: 200, type: [User] })
  @Delete(':id')
  public removeUser(@Param('id') id: number) {
    return this.usersService.removeUser(id);
  }
}
