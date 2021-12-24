import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { IUserProfile } from './interfaces/user-profile.interface'
import { CreateUserProfileDto } from './dto/create-user-profile.dto'
import { v4 as uuid } from 'uuid'
import { MinioClientService } from '../minio-client/minio-client.service'
import { BufferedFile } from '../minio-client/file.model'
@Injectable()
export class UserService {
    constructor(
        @InjectModel('UserProfile')
        private readonly userProfileModel: Model<IUserProfile>,
        private minioClientService: MinioClientService,
    ) {}

    async getUserProfile(userProfileId): Promise<IUserProfile> {
        try {
            const userProfile = await this.userProfileModel
                .findOne(
                    {
                        userId: userProfileId,
                    },
                    'username displayName bio avatar isVerified userId',
                )
                .exec()

            return userProfile
        } catch (error) {
            return error
        }
    }
    // returning from DB so, it's an interface of userProfile
    async createUserProfile(
        createUserProfileDto: CreateUserProfileDto,
    ): Promise<IUserProfile> {
        try {
            const userProfileExists = await this.userProfileModel
                .findOne({
                    userId: createUserProfileDto.userId,
                    isVerified: createUserProfileDto.isVerified,
                })
                .exec()
            if (userProfileExists) {
                return userProfileExists
            }

            //  upsert = true option creates the object if it doesn't exist. defaults to false.
            const newUserProfile = await this.userProfileModel.findOneAndUpdate(
                {
                    userId: createUserProfileDto.userId,
                },
                createUserProfileDto,
                { new: true, upsert: true },
            )

            return newUserProfile
        } catch (error) {
            return error
        }
    }

    async updateUserProfile(
        userId: string,
        updateUserProfile: CreateUserProfileDto,
        userProfilePictureFile: BufferedFile,
    ): Promise<IUserProfile> {
        // Makes sure it doesn't return a 500 and crash the server

        try {
            if (!userProfilePictureFile) {
                const updatedUserProfile =
                    await this.userProfileModel.findOneAndUpdate(
                        { userId: userId },
                        {
                            username: updateUserProfile.username,
                            displayName: updateUserProfile.displayName,
                            bio: updateUserProfile.bio,
                        },
                        {
                            new: true,
                            runValidators: true,
                            useFindAndModify: false,
                        },
                    )
                return updatedUserProfile
            } else {
                const uploaded_files =
                    await this.minioClientService.uploadProfilePicture(
                        userProfilePictureFile[0],
                    ) /// saving coverFile then responding
                const { profilePictureFile } = uploaded_files
                const updatedUserProfile =
                    await this.userProfileModel.findOneAndUpdate(
                        { userId: userId },
                        {
                            username: updateUserProfile.username,
                            displayName: updateUserProfile.displayName,
                            bio: updateUserProfile.bio,
                            avatar: profilePictureFile.url,
                        },
                        {
                            new: true,
                            runValidators: true,
                            useFindAndModify: false,
                        },
                    )
                return updatedUserProfile
            }
        } catch (error) {
            // makes sure its an instance of error
            console.log(error)
            return error
        }
    }
}
