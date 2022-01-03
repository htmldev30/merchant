import * as mongoose from 'mongoose'

export const UserShopSchema = new mongoose.Schema({
    shopName: {
        type: String,
        required: [true, 'Shop Name cannot be left blanked'],
        minlength: [2, 'Shop name must be longer'],
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
    shopDescription: {
        type: String,
        required: true,
        maxlength: [256, 'Shop description is too long'],
    },
    shopSlogan: {
        type: String,
        required: false,
        maxlength: [64, 'Shop Slogan is too long'],
    },
    shopLocation: {
        type: String,
        required: false,
    },
    shopProfilePicture: {
        type: String,
        required: [true, 'A Shop Profile Picture is required'],
    },
    shopProfileBanner: {
        type: String,
        required: [true, 'A Shop Profile Banner is required'],
    },
    shopId: {
        type: String,
        unique: [true, ''],
        required: [true, ''],
    },
    shopCreatorId: {
        type: String,
        unique: [true, 'A shop has already been created'],
        required: [true, ''],
    },
})
