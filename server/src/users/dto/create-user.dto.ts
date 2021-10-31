import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
    @ApiProperty({ example: 'user@gmail.com', description: 'user email' })
    readonly email: string
    @ApiProperty({
        example: `qwerty(don't use the same passwords)`,
        description: 'user password',
    })
    readonly password: string
}
