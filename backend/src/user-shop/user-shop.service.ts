import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUserProfile } from 'src/user/interfaces/user-profile.interface'
import { IUserShop } from './interfaces/create-user-shop.interface'
import { CreateUserShopDto } from './dto/create-user-shop.dto'
import { MinioClientService } from 'src/minio-client/minio-client.service'
import { BufferedFile } from 'src/minio-client/file.model'
import { v4 as uuid } from 'uuid'
import FieldsToUpdate from 'src/common/shared/fieldsToUpdate.common'
@Injectable()
export class UserShopService {
    constructor(
        @InjectModel('UserShop')
        private readonly userShopModel: Model<IUserShop>,
        private minioClientService: MinioClientService,
        @InjectModel('UserProfile')
        private readonly userProfileModel: Model<IUserProfile>,
    ) {}

    async getUserShop(shopCreatorId: string): Promise<IUserShop> {
        try {
            const userShop = await this.userShopModel
                .findOne(
                    { shopCreatorId: shopCreatorId },
                    'shopName shopCategory shopDescription shopSlogan shopLocation shopProfilePicture shopProfileBanner shopId',
                )
                .exec()

            return userShop
        } catch (error) {
            return error
        }
    }
    async createUserShop(
        createUserShopDto: CreateUserShopDto,
        userShopProfilePictureFile: BufferedFile,
        userShopProfileBannerFile: BufferedFile,
    ): Promise<IUserShop> {
        try {
            const uploaded_files =
                await this.minioClientService.uploadUserShopPictures(
                    userShopProfilePictureFile,
                    userShopProfileBannerFile,
                )

            const shopId = uuid()
            const isSeller = await this.userProfileModel.findOneAndUpdate(
                {
                    userId: createUserShopDto.shopCreatorId,
                },
                { isSeller: true, shopId: shopId },
                { new: true, upsert: true },
            )
            const newUserShop = await this.userShopModel.findOneAndUpdate(
                {
                    shopCreatorId: createUserShopDto.shopCreatorId,
                },
                {
                    shopName: createUserShopDto.shopName,
                    shopCategory: createUserShopDto.shopCategory,
                    shopDescription: createUserShopDto.shopDescription,
                    shopSlogan: createUserShopDto.shopSlogan,
                    shopLocation: createUserShopDto.shopLocation,
                    shopProfilePicture:
                        uploaded_files.userShopProfilePictureFile.url,
                    shopProfileBanner:
                        uploaded_files.userShopProfileBannerFile.url,
                    shopId: shopId,
                    shopCreatorId: createUserShopDto.shopCreatorId,
                },
                { new: true, upsert: true },
            )
            return newUserShop
        } catch (error) {
            return error
        }
    }
    async updateUserShop(
        shopCreatorId: string,
        updateUserShopDto: CreateUserShopDto,
        userShopProfilePictureFile?: BufferedFile,
        userShopProfileBannerFile?: BufferedFile,
    ): Promise<IUserShop> {
        try {
            const existingUserShop = await this.userShopModel.findOne({
                shopCreatorId: shopCreatorId,
            })

            const userShopPictureFilesIdentifiers = {
                shopProfilePicture: existingUserShop.shopProfilePicture.split(
                    '/user-shop-profile-picture/',
                ),
                shopBannerPicture: existingUserShop.shopProfileBanner.split(
                    '/user-shop-profile-banner/',
                ),
            }
            const userShopPictureFiles = {
                shopProfilePicture: '',
                shopBannerPicture: '',
            }

            const uploaded_files =
                await this.minioClientService.uploadUserShopPictures(
                    userShopProfilePictureFile,
                    userShopProfileBannerFile,
                )

            if (userShopProfilePictureFile) {
                if (
                    userShopPictureFilesIdentifiers.shopProfilePicture[0].replace(
                        'http://',
                        '',
                    ) == `${process.env.SERVER_URL}`
                ) {
                    await this.minioClientService.deleteUserShopProfilePicture(
                        userShopPictureFilesIdentifiers.shopProfilePicture[1],
                    )
                }
                userShopPictureFiles.shopProfilePicture = `${uploaded_files.userShopProfilePictureFile.url}`
            }
            if (userShopProfileBannerFile) {
                if (
                    userShopPictureFilesIdentifiers.shopBannerPicture[0].replace(
                        'http://',
                        '',
                    ) == `${process.env.SERVER_URL}`
                ) {
                    await this.minioClientService.deleteUserShopProfileBannerPicture(
                        userShopPictureFilesIdentifiers.shopBannerPicture[1],
                    )
                }

                userShopPictureFiles.shopBannerPicture = `${uploaded_files.userShopProfileBannerFile.url}`
            }

            const userShopFieldsToUpdate = FieldsToUpdate({
                shopName: updateUserShopDto.shopName,
                shopCategory: updateUserShopDto.shopCategory,
                shopDescription: updateUserShopDto.shopDescription,
                shopSlogan: updateUserShopDto.shopSlogan,
                shopLocation: updateUserShopDto.shopLocation,
                shopProfilePicture: userShopPictureFiles.shopProfilePicture,
                shopProfileBanner: userShopPictureFiles.shopBannerPicture,
            })
            const updatedUserShop = await this.userShopModel.findOneAndUpdate(
                { shopCreatorId: shopCreatorId },
                {
                    ...userShopFieldsToUpdate,
                },
                {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                },
            )
            return updatedUserShop
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
