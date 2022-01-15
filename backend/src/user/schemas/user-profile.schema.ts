import * as mongoose from 'mongoose'

export const UserProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username cannot be left blank'],
        unique: [true, 'Username taken'],
        minlength: [6, 'Username must be longer than 6 characters'],
        maxlength: [32, 'Username is too long'],
        lowercase: () => true,
        match: [
            /^(?![0-9_.-]+$)[ A-Za-zñáéíóúü0-9_.-]*$/,
            'You may only use _ . - | Letters are required',
        ],
        trim: () => true,
    },
    displayName: {
        type: String,
        required: false,
        maxlength: [32, 'Display name is too long'],
        trim: true,
    },
    bio: {
        type: String,
        required: false,
        default: '',
        maxlength: [64, 'Bio is too long'],
        trim: true,
    },
    avatar: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
    },
    isVerified: {
        type: Boolean,
        required: [true, 'You must verify your email to use this feature'],
    },
    isSeller: {
        type: Boolean,
        default: false,
        required: true,
    },
    shopId: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: true,
        unique: true,
    },
})
