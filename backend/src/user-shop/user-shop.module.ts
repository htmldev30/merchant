import { Module } from '@nestjs/common'
import { UserShopController } from './user-shop.controller'
import { UserShopService } from './user-shop.service'
import { MongooseModule } from '@nestjs/mongoose'
import { MinioClientModule } from 'src/minio-client/minio-client.module'
import { UserProfileSchema } from 'src/user/schemas/user-profile.schema'
import { UserShopSchema } from './schemas/user-shop-schema.schema'
@Module({
    imports: [
        MinioClientModule,
        MongooseModule.forFeature([
            { name: 'UserShop', schema: UserShopSchema },
            { name: 'UserProfile', schema: UserProfileSchema },
        ]),
    ],
    controllers: [UserShopController],
    providers: [UserShopService],
})
export class UserShopModule {}
