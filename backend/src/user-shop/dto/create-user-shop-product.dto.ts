export class CreateUserShopProductDto {
    readonly productName: string
    readonly productCategory: string
    readonly productDescription: string
    readonly productPrice: number
    readonly productDetails: string
    readonly productPictureFront: string
    readonly productPictureLeft: string
    readonly productPictureRight: string
    readonly productPictureBack: string
    readonly productId: string
    readonly shopId: string
    readonly shopCreatorId: string
}
