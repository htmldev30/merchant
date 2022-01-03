import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { MinioService } from 'nestjs-minio-client'
import { BufferedFile } from './file.model'
import fileFilter from './other/file-filter'
import renameFile from './other/rename-file'

interface IFiles {
    userShopProfilePictureFile?: { original_name: string; url: string }
    userShopProfileBannerFile?: { original_name: string; url: string }
}
@Injectable()
export class MinioClientService {
    constructor(private readonly minio: MinioService) {
        this.logger = new Logger('MinioService')

        // THIS IS THE POLICY
        const profilePicturePolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: ['arn:aws:s3:::profile-picture'], // Change this according to your bucket name
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:PutObject',
                        's3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:GetObject',
                        's3:ListMultipartUploadParts',
                    ],
                    Resource: ['arn:aws:s3:::profile-picture/*'], // Change this according to your bucket name
                },
            ],
        }
        // THIS IS THE USER SHOP POLICY
        const userShopProfilePicturePolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: ['arn:aws:s3:::user-shop-profile-picture'], // Change this according to your bucket name
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:PutObject',
                        's3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:GetObject',
                        's3:ListMultipartUploadParts',
                    ],
                    Resource: ['arn:aws:s3:::user-shop-profile-picture/*'], // Change this according to your bucket name
                },
            ],
        }
        // THIS IS THE USER SHOP POLICY
        const userShopProfileBannerPolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: ['arn:aws:s3:::user-shop-profile-banner'], // Change this according to your bucket name
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:PutObject',
                        's3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:GetObject',
                        's3:ListMultipartUploadParts',
                    ],
                    Resource: ['arn:aws:s3:::user-shop-profile-banner/*'], // Change this according to your bucket name
                },
            ],
        }

        this.client.setBucketPolicy(
            process.env.MINIO_PROFILE_PICTURE_BUCKET_NAME,
            JSON.stringify(profilePicturePolicy),
            function (err) {
                if (err) throw err

                console.log('Profile Picture Bucket Policy Set')
            },
        )
        this.client.setBucketPolicy(
            process.env.MINIO_USER_SHOP_PROFILE_PICTURE_BUCKET_NAME,
            JSON.stringify(userShopProfilePicturePolicy),
            function (err) {
                if (err) throw err

                console.log('User Shop Profile Picture Bucket Policy Set')
            },
        )
        this.client.setBucketPolicy(
            process.env.MINIO_USER_SHOP_PROFILE_BANNER_BUCKET_NAME,
            JSON.stringify(userShopProfileBannerPolicy),
            function (err) {
                if (err) throw err

                console.log('User Shop Profile Banner Bucket Policy Set')
            },
        )
    }

    private readonly logger: Logger
    private readonly profilePictureBucketName =
        process.env.MINIO_PROFILE_PICTURE_BUCKET_NAME
    private readonly userShopProfilePictureBucketName =
        process.env.MINIO_USER_SHOP_PROFILE_PICTURE_BUCKET_NAME
    private readonly userShopProfileBannerBucketName =
        process.env.MINIO_USER_SHOP_PROFILE_BANNER_BUCKET_NAME

    public get client() {
        return this.minio.client
    }

    public async uploadProfilePicture(
        profilePicture?: BufferedFile,
        profilePictureBucketName: string = this.profilePictureBucketName,
    ) {
        const file = {
            profilePictureFile: { original_name: '', url: '' },
        }
        if (profilePicture) {
            fileFilter(profilePicture)
            const profilePictureFile = renameFile(profilePicture)

            // We need to append the extension at the end otherwise Minio will save it as a generic file
            const profilePictureFileName =
                profilePictureFile.hashedFileName + profilePictureFile.extension

            this.client.putObject(
                profilePictureBucketName,
                profilePictureFileName,
                profilePicture.buffer,
                profilePictureFile.metaData,
                function (err, res) {
                    if (err) {
                        throw new HttpException(
                            'Error uploading file',
                            HttpStatus.BAD_REQUEST,
                        )
                    }
                },
            )
            file.profilePictureFile.original_name = `${profilePictureFileName}`
            file.profilePictureFile.url = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_PROFILE_PICTURE_BUCKET_NAME}/${profilePictureFileName}`
        }

        return file
    }

    public async uploadUserShopPictures(
        userShopProfilePicture?: BufferedFile,
        userShopProfileBanner?: BufferedFile,
        userShopProfilePictureBucketName: string = this
            .userShopProfilePictureBucketName,
        userShopProfileBannerBucketName: string = this
            .userShopProfileBannerBucketName,
    ) {
        const files: IFiles = {
            userShopProfilePictureFile: { original_name: '', url: '' },
            userShopProfileBannerFile: { original_name: '', url: '' },
        }
        if (userShopProfilePicture) {
            fileFilter(userShopProfilePicture)
            const userShopProfilePictureFile = renameFile(
                userShopProfilePicture,
            )
            const userShopProfilePictureFileName =
                userShopProfilePictureFile.hashedFileName +
                userShopProfilePictureFile.extension
            this.client.putObject(
                userShopProfilePictureBucketName,
                userShopProfilePictureFileName,
                userShopProfilePicture.buffer,
                userShopProfilePictureFile.metaData,
                function (err, res) {
                    if (err) {
                        throw new HttpException(
                            'Error uploading file',
                            HttpStatus.BAD_REQUEST,
                        )
                    }
                },
            )

            files.userShopProfilePictureFile.original_name = `${userShopProfilePictureFileName}`
            files.userShopProfilePictureFile.url = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_USER_SHOP_PROFILE_PICTURE_BUCKET_NAME}/${userShopProfilePictureFileName}`
        }
        if (userShopProfileBanner) {
            fileFilter(userShopProfileBanner)
            const userShopProfileBannerFile = renameFile(userShopProfileBanner)
            const userShopProfileBannerFileName =
                userShopProfileBannerFile.hashedFileName +
                userShopProfileBannerFile.extension
            this.client.putObject(
                userShopProfileBannerBucketName,
                userShopProfileBannerFileName,
                userShopProfileBanner.buffer,
                userShopProfileBannerFile.metaData,
                function (err, res) {
                    if (err) {
                        throw new HttpException(
                            'Error uploading file',
                            HttpStatus.BAD_REQUEST,
                        )
                    }
                },
            )
            files.userShopProfileBannerFile.original_name = `${userShopProfileBannerFileName}`
            files.userShopProfileBannerFile.url = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_USER_SHOP_PROFILE_BANNER_BUCKET_NAME}/${userShopProfileBannerFileName}`
        }

        // We need to append the extension at the end otherwise Minio will save it as a generic file
        return files
    }
    async checkProfilePicture(
        objectName: string,
        profilePictureBucketName: string = this.profilePictureBucketName,
    ) {
        this.client.StatObject(
            profilePictureBucketName,
            objectName,
            function (err, res) {
                if (err)
                    throw new HttpException(
                        'An error occurred while checking object status!',
                        HttpStatus.BAD_REQUEST,
                    )
            },
        )
    }
    async deleteProfilePicture(
        objectName: string,
        profilePictureBucketName: string = this.profilePictureBucketName,
    ) {
        this.client.removeObject(
            profilePictureBucketName,
            objectName,
            function (err, res) {
                if (err)
                    throw new HttpException(
                        'An error occurred when deleting!',
                        HttpStatus.BAD_REQUEST,
                    )
            },
        )
    }
    async deleteUserShopProfilePicture(
        objectName: string,
        userShopProfilePictureBucketName: string = this
            .userShopProfilePictureBucketName,
    ) {
        this.client.removeObject(
            userShopProfilePictureBucketName,
            objectName,
            function (err, res) {
                if (err)
                    throw new HttpException(
                        'An error occurred when deleting!',
                        HttpStatus.BAD_REQUEST,
                    )
            },
        )
    }
    async deleteUserShopProfileBannerPicture(
        objectName: string,
        userShopProfileBannerBucketName: string = this
            .userShopProfileBannerBucketName,
    ) {
        this.client.removeObject(
            userShopProfileBannerBucketName,
            objectName,
            function (err, res) {
                if (err)
                    throw new HttpException(
                        'An error occurred when deleting!',
                        HttpStatus.BAD_REQUEST,
                    )
            },
        )
    }
}
