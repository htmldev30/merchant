function BadProfilePictureFilesError(message = []) {
    this.name = 'BadProfilePictureFilesError'
    this.message = message
}
BadProfilePictureFilesError.prototype = Error.prototype

export default BadProfilePictureFilesError
