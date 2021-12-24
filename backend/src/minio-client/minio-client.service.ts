import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common'
import { MinioService } from 'nestjs-minio-client'
import { BufferedFile } from './file.model'
import fileFilter from './other/file-filter'
import renameFile from './other/rename-file'

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

        this.client.setBucketPolicy(
            process.env.MINIO_PROFILE_PICTURE_BUCKET_NAME,
            JSON.stringify(profilePicturePolicy),
            function (err) {
                if (err) throw err

                console.log('Profile Picture Bucket Policy Set')
            },
        )
    }

    private readonly logger: Logger
    private readonly profilePictureBucketName =
        process.env.MINIO_PROFILE_PICTURE_BUCKET_NAME

    public get client() {
        return this.minio.client
    }

    public async uploadProfilePicture(
        profilePicture: BufferedFile,
        profilePictureBucketName: string = this.profilePictureBucketName,
    ) {
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

        const files = {
            profilePictureFile: {
                original_name: `${profilePictureFileName}`,
                url: `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_PROFILE_PICTURE_BUCKET_NAME}/${profilePictureFileName}`,
            },
        }
        return files
    }

    async delete(
        objetName: string,
        profilePictureBucketName: string = this.profilePictureBucketName,
    ) {
        this.client.removeObject(
            profilePictureBucketName,
            objetName,
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
