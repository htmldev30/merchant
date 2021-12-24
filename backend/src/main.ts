import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    })

    await app.listen(3001, '192.168.0.9')
}
bootstrap()
