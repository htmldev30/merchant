import * as mongoose from 'mongoose'

export const UserShopProductSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name cannot be left blanked'],
        minlength: [2, 'Product name must be longer'],
        maxLength: [64, 'Product name is too long'],
        match: [
            /^(?![0-9_.-]+$)[ A-Za-zñáéíóúü0-9_.-]*$/,
            'You may only use _ . - | Letters are required',
        ],
    },
    productCategory: {
        type: String,
        required: true,
        maxlength: [32, 'Product category is too long'],
    },
    productDescription: {
        type: String,
        required: [true, 'Product must have description'],
        minlength: [32, 'Product description is too short'],
        maxlength: [512, 'Product description is too long'],
    },
    productDetails: {
        type: String,
        required: [true, 'Product must have details'],
        minlength: [32, 'Product details is too short'],
        maxlength: [512, 'Product details is too long'],
    },
    productPrice: {
        type: Number,
        required: [true, 'Product must have a price'],
    },

    productPictureFront: {
        type: String,
        required: [true, 'A Front Product Photo is Required'],
    },
    productPictureLeft: {
        type: String,
        required: [true, 'A Left Product Photo is Required'],
    },
    productPictureRight: {
        type: String,
        required: [true, 'A Right Product Photo is Required'],
    },
    productPictureBack: {
        type: String,
        required: [true, 'A Back Product Photo is Required'],
    },
    productId: {
        type: String,
        required: [true, ''],
    },
    shopId: {
        type: String,
        required: [true, ''],
    },
    shopCreatorId: {
        type: String,
        required: [true, ''],
    },
})
