import { Document } from 'mongoose'

export interface IUserShopProduct extends Document {
    readonly productName: string
    readonly productCategory: string
    readonly productDescription: string
    readonly productDetails: string
    readonly productPrice: number
    readonly productPictureFront: string
    readonly productPictureLeft: string
    readonly productPictureRight: string
    readonly productPictureBack: string
    readonly productId: string
    readonly shopId: string
    readonly shopCreatorId: string
}
