// Code adapted from educative.io article example 
// https://www.educative.io/answers/what-is-node-cryptocreatehashalgorithm-options
import * as crypto from 'crypto'
export const renameFile = (file) => {
    const timestamp = Date.now().toString()
    const hashedFileName = crypto
        .createHash('md5')
        .update(timestamp)
        .digest('hex')
    const extension = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length,
    )
    const metaData = {
        'Content-Type': file.mimetype,
    }
    return { extension, hashedFileName, metaData }
}

export const renameProductFiles = (...files) => {
    const allFiles = {
        userShopProductPictureFrontFile: {
            extension: '',
            hashedFileName: '',
            metaData: '',
        },
        userShopProductPictureLeftFile: {
            extension: '',
            hashedFileName: '',
            metaData: '',
        },
        userShopProductPictureRightFile: {
            extension: '',
            hashedFileName: '',
            metaData: '',
        },
        userShopProductPictureBackFile: {
            extension: '',
            hashedFileName: '',
            metaData: '',
        },
    }
    files.forEach((file, index) => {
        const timestamp = Date.now().toString()
        const hashedFileName = crypto
            .createHash('md5')
            .update(file.fieldname + timestamp)
            .digest('hex')
        const extension = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
        )
        const metaData = {
            'Content-Type': file.mimetype,
        }
        const files = Object.keys(allFiles)
        allFiles[files[index]].hashedFileName = hashedFileName
        allFiles[files[index]].extension = extension
        allFiles[files[index]].metaData = metaData
    })

    return allFiles
}

export default renameFile
