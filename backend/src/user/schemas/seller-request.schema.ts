import * as mongoose from 'mongoose'

export const SellerRequestSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: [true, 'Shop name cannot be left blank'],
        unique: [true, 'Shop name taken'],
        minlength: [2, 'Shop name must be longer than 2 characters'],
        maxlength: [32, 'Shop name is too long'],
        match: [
            /^(?![0-9_.-]+$)[ A-Za-zñáéíóúü0-9_.-]*$/,
            'You may only use _ . - | Letters are required',
        ],
    },
    shopCategory: {
        type: String,
        required: true,
        maxlength: [32, 'Shop category is too long'],
    },
    shopDetails: {
        type: String,
        required: true,
        maxlength: [256, 'Shop details is too long'],
    },
    shopReferences: {
        type: String,
        required: false,
        maxlength: [256, 'Shop details is too long'],
    },
    userProfileId: {
        type: String,
        unique: [true, 'A request as already been made'],
        required: [true, ''],
    },
    isApproved: {
        type: Boolean,
        required: [true, 'You must verify your email to use this feature'],
    },
})
