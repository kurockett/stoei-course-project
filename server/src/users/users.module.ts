import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from '../roles/roles.model'
import { UserRoles } from '../roles/user-roles.model'
import { UsersController } from './users.controller'
import { User } from './users.model'
import { UsersService } from './users.service'
import { RolesModule } from '../roles/roles.module'
import { AuthModule } from '../auth/auth.module'
import { UserProjects } from '../projects/user-projects.model'
import { ProjectsModule } from '../projects/projects.module'
import { Project } from '../projects/projects.model'

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles]),
        RolesModule,
        forwardRef(() => AuthModule),
    ],
    exports: [UsersService, AuthModule],
})
export class UsersModule {}
