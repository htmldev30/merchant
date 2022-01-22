import { HttpException, HttpStatus } from '@nestjs/common'
import BadProfilePictureFilesError from '../shared/file-errors'
export const fileFilter = (profilePicture?, profileBanner?) => {
    // if it doesn't match these, file is not an image\
    // ! Loop ? for unlimited files
    const errors = []
    if (profilePicture) {
        if (
            profilePicture.mimetype === 'image/jpg' ||
            profilePicture.mimetype === 'image/jpeg' ||
            profilePicture.mimetype === 'image/png'
        ) {
        } else {
            errors.push('Profile picture file type is not supported')
        }

        if (profilePicture.size > 50000000) {
            errors.push('Profile picture file size is too large')
        }
    }

    if (profileBanner) {
        if (
            profileBanner.mimetype === 'image/jpg' ||
            profileBanner.mimetype === 'image/jpeg' ||
            profileBanner.mimetype === 'image/png'
        ) {
        } else {
            errors.push('Profile picture file type is not supported')
        }

        if (profileBanner.size > 50000000) {
            errors.push('Profile picture file size is too large')
        }
    }

    if (errors.length !== 0) {
        throw new BadProfilePictureFilesError(errors)
    }
}

export const productFileFilter = (...productFiles) => {
    // if it doesn't match these, file is not an image\
    // ! Loop ? for unlimited files
    const errors = []
    productFiles.forEach((file, index) => {
        if (file) {
            if (
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png'
            ) {
            } else {
                errors.push('Profile picture file type is not supported')
            }

            if (file.size > 50000000) {
                errors.push('Profile picture file size is too large')
            }
        }
    })

    if (errors.length !== 0) {
        throw new BadProfilePictureFilesError(errors)
    }
}
