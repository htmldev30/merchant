import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUserProfile } from './interfaces/user-profile.interface'
import { CreateUserProfileDto } from './dto/create-user-profile.dto'
import { v4 as uuid } from 'uuid'
import { MinioClientService } from '../minio-client/minio-client.service'
import { BufferedFile } from '../minio-client/file.model'
import { SellerRequestDto } from './dto/seller-request.dto'
import { ISellerRequest } from './interfaces/seller-request.interface'
import FieldsToUpdate from 'src/common/shared/fieldsToUpdate.common'
@Injectable()
export class UserService {
    constructor(
        @InjectModel('UserProfile')
        private readonly userProfileModel: Model<IUserProfile>,
        @InjectModel('SellerRequest')
        private readonly sellerRequestModel: Model<ISellerRequest>,
        private minioClientService: MinioClientService,
    ) {}

    async getUserProfile(userProfileId): Promise<IUserProfile> {
        try {
            const userProfile = await this.userProfileModel
                .findOne(
                    {
                        userId: userProfileId,
                    },
                    'username displayName bio avatar isVerified isSeller userId',
                )
                .exec()
            return userProfile
        } catch (error) {
            return error
        }
    }

    async createUserProfile(
        createUserProfileDto: CreateUserProfileDto,
    ): Promise<IUserProfile> {
        try {
            const userProfileExists = await this.userProfileModel
                .findOne({
                    userId: createUserProfileDto.userId,
                    isVerified: createUserProfileDto.isVerified, // checks if user is also verify | else ? - update!
                })
                .exec()
            if (userProfileExists) {
                //  upsert = true option creates the object if it doesn't exist. defaults to false.
                const newUserProfile =
                    await this.userProfileModel.findOneAndUpdate(
                        {
                            userId: createUserProfileDto.userId,
                        },
                        { isVerified: createUserProfileDto.isVerified },
                        { new: true, upsert: true },
                    )
                return newUserProfile
            } else {
                //  upsert = true option creates the object if it doesn't exist. defaults to false.
                const newUserProfile =
                    await this.userProfileModel.findOneAndUpdate(
                        {
                            userId: createUserProfileDto.userId,
                        },
                        createUserProfileDto,
                        { new: true, upsert: true },
                    )
                return newUserProfile
            }
            return userProfileExists
        } catch (error) {
            return error
        }
    }

    async updateUserProfile(
        userId: string,
        updateUserProfileDto: CreateUserProfileDto,
        userProfilePictureFile?: BufferedFile,
    ): Promise<IUserProfile> {
        // try - Makes sure it doesn't return a 500 and crash the server
        try {
            //#region - Check if avatar existed on our server
            const existingUserProfile = await this.userProfileModel.findOne({
                userId: userId,
            })

            // getting the endpoint with port and name of file
            const profilePictureIdentifier =
                existingUserProfile.avatar.split('/profile-picture/')
            // comparing endpoint with port to server endpoint with port  | if from same server, then
            // removing http:// with blank
            if (userProfilePictureFile) {
                if (
                    profilePictureIdentifier[0].replace('http://', '') ==
                    `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}`
                ) {
                    await this.minioClientService.deleteProfilePicture(
                        profilePictureIdentifier[1],
                    )
                }
            }

            //#endregion
            const profilePictureFile = { avatar: '' }
            const uploaded_files =
                await this.minioClientService.uploadProfilePicture(
                    userProfilePictureFile,
                ) /// saving coverFile then responding
            if (userProfilePictureFile) {
                profilePictureFile.avatar = `${uploaded_files.profilePictureFile.url}`
            }

            const userProfileFieldsToUpdate = FieldsToUpdate({
                username: updateUserProfileDto.username,
                displayName: updateUserProfileDto.displayName,
                bio: updateUserProfileDto.bio,
                avatar: profilePictureFile.avatar,
            })
            const updatedUserProfile =
                await this.userProfileModel.findOneAndUpdate(
                    { userId: userId },
                    {
                        ...userProfileFieldsToUpdate,
                    },
                    {
                        new: true,
                        runValidators: true,
                        useFindAndModify: false,
                    },
                )
            return updatedUserProfile
        } catch (error) {
            // makes sure its an instance of error
            console.log(error)
            return error
        }
    }
    async getSellerRequest(userProfileId: string): Promise<ISellerRequest> {
        try {
            const sellerRequest = await this.sellerRequestModel
                .findOne(
                    {
                        userProfileId: userProfileId,
                    },
                    'isApproved',
                )
                .exec()
            return sellerRequest
        } catch (error) {
            return error
        }
    }
    // returning from DB so, it's an interface of userProfile
    async createSellerRequest(
        sellerRequestDto: SellerRequestDto,
    ): Promise<ISellerRequest> {
        try {
            const sellerRequest = await this.sellerRequestModel.create(
                sellerRequestDto,
            )
            return sellerRequest
        } catch (error) {
            return error
        }
    }
}
