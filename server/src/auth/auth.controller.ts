import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Sign In')
@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/sign-in')
    public signIn(@Body() userDto: CreateUserDto) {
        return this.authService.signIn(userDto)
    }

    @Post('/sign-up')
    public signUp(@Body() userDto: CreateUserDto) {
        return this.authService.signUp(userDto)
    }

    @Get()
    public getUserInfo(@Req() req) {
        return this.authService.getUserInfo(req)
    }
}
