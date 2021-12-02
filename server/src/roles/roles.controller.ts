import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { RolesService } from './roles.service'

@Controller('api/roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @Post()
    public createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get()
    public getAllRoles() {
        return this.roleService.getAllRoles()
    }

    @Get(':value')
    public getRoleByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }
}
