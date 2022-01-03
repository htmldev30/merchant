import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
// Custom
import { UserProfileSchema } from './schemas/user-profile.schema'
import { SellerRequestSchema } from './schemas/seller-request.schema'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { MinioClientModule } from 'src/minio-client/minio-client.module'
@Module({
    imports: [
        MinioClientModule,
        MongooseModule.forFeature([
            { name: 'UserProfile', schema: UserProfileSchema },
            { name: 'SellerRequest', schema: SellerRequestSchema },
        ]),
    ],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
