import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { LabelsModule } from './labels/labels.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/tasks.model';
import { Label } from './labels/labels.model';
import { Project } from './projects/projects.model';
import { CategoriesModule } from './categories/categories.module';
import { UserProjects } from './projects/user-projects.model';
import { CategoryTasks } from './tasks/category-tasks.model';
import { Category } from './categories/categories.model';
import { UserTasks } from './tasks/user-tasks.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [
        User,
        Role,
        UserRoles,
        Project,
        Task,
        Label,
        UserProjects,
        CategoryTasks,
        Category,
        UserTasks,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ProjectsModule,
    LabelsModule,
    TasksModule,
    CategoriesModule,
  ],
})
export class AppModule {}
