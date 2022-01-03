import * as crypto from 'crypto'
const renameFile = (file) => {
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

export default renameFile
