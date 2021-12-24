export const errorFormatter = (error): string => {
    let message = ''

    if (error.name === 'BadPodcastFilesError') {
        message = error.message
    }
    if (error.name === 'CastError') {
        message = `Invalid ${error.path}: ${error.value}`
    }
    if (error.code === 11000) {
        const dupField = Object.keys(error.keyValue)[0]

        message = `${dupField} taken`
    }
    if (error.name == 'ValidationError') {
        for (const field in error.errors) {
            message = error.errors[field].message
        }
    }
    return message
}
