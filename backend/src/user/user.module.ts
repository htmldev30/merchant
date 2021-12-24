import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
// Custom
import { UserProfileSchema } from './schemas/user-profile.schema'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MinioClientModule } from 'src/minio-client/minio-client.module'
@Module({
    imports: [
        MinioClientModule,
        MongooseModule.forFeature([
            { name: 'UserProfile', schema: UserProfileSchema },
        ]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
