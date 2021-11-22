import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)
    const config = new DocumentBuilder()
        .setTitle(`stoei backend api`)
        .setDescription(`api, backend, stoei`)
        .setVersion('0.0.1')
        .addTag(`Portnov N.V. 873603 backend`)
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)
    // app.useGlobalGuards(JwtAuthGuard)
    app.enableCors({
        origin: true,
        allowedHeaders:
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
        methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        credentials: true,
    })
    await app.listen(PORT, () => {
        console.log(`server started on port ${PORT}`)
    })
}
start()
