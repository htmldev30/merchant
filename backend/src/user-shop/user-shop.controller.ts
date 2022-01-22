import {
    Controller,
    Body,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Res,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common'

import {
    FileFieldsInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express'
import { CreateUserShopDto } from './dto/create-user-shop.dto'
import { errorFormatter } from 'src/user/others/error.formatter'
import { UserShopService } from './user-shop.service'
import { CreateUserShopProductDto } from './dto/create-user-shop-product.dto'
@Controller('user-shop')
export class UserShopController {
    constructor(private userShopService: UserShopService) {}

    @Get('/:shopCreatorId')
    async getUserShop(@Res() res, @Param('shopCreatorId') shopCreatorId) {
        console.log('GET')
        const userShop = await this.userShopService.getUserShop(shopCreatorId)
        if (userShop instanceof Error) {
            const formattedError = errorFormatter(userShop)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({ userShop })
    }

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'userShopProfilePictureFile', maxCount: 1 },
            { name: 'userShopProfileBannerFile', maxCount: 1 },
        ]),
    )
    async createUserShop(
        @Res() res,
        @Body() createUserShopDto: CreateUserShopDto,
        @UploadedFiles() files,
    ) {
        console.log('POST')
        const { userShopProfilePictureFile, userShopProfileBannerFile } = files

        if (!userShopProfilePictureFile || !userShopProfileBannerFile) {
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: 'Cover file and audio file are both required' })
        }
        const newUserShop = await this.userShopService.createUserShop(
            createUserShopDto,
            userShopProfilePictureFile[0],
            userShopProfileBannerFile[0],
        )
        // Lets frontend know it's an error
        if (newUserShop instanceof Error) {
            const formattedError = errorFormatter(newUserShop)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({
            message: 'User Shop Created',
        })
    }
    @Put('/:shopCreatorId')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'userShopProfilePictureFile', maxCount: 1 },
            { name: 'userShopProfileBannerFile', maxCount: 1 },
        ]),
    )
    async updateUserShop(
        @Res() res,
        @Param('shopCreatorId') shopCreatorId: string,
        @Body() updateUserShopDto: CreateUserShopDto,
        @UploadedFiles() files,
    ) {
        console.log('UPDATE')
        const { userShopProfilePictureFile, userShopProfileBannerFile } = files
        const givenUserShopPictures = [
            { userShopProfilePictureFile: [], userShopProfileBannerFile: [] },
        ]
        if (userShopProfilePictureFile) {
            givenUserShopPictures[0].userShopProfilePictureFile =
                userShopProfilePictureFile
        }
        if (userShopProfileBannerFile) {
            givenUserShopPictures[0].userShopProfileBannerFile =
                userShopProfileBannerFile
        }
        const updatedUserShop = await this.userShopService.updateUserShop(
            shopCreatorId,
            updateUserShopDto,
            givenUserShopPictures[0].userShopProfilePictureFile[0],
            givenUserShopPictures[0].userShopProfileBannerFile[0],
        )
        if (updatedUserShop instanceof Error) {
            const formattedError = errorFormatter(updatedUserShop)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({
            message: 'User Shop Updated',
        })
    }
    @Post('/:shopCreatorId/:shopId/create-new-product')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'userShopProductPictureFrontFile' },
            { name: 'userShopProductPictureLeftFile' },
            { name: 'userShopProductPictureRightFile' },
            { name: 'userShopProductPictureBackFile' },
        ]),
    )
    async createUserShopProduct(
        @Res() res,
        @Param('shopCreatorId') shopCreatorId: string,
        @Param('shopId') shopId: string,
        @Body() createUserShopProductDto: CreateUserShopProductDto,
        @UploadedFiles() files,
    ) {
        const {
            userShopProductPictureFrontFile,
            userShopProductPictureLeftFile,
            userShopProductPictureRightFile,
            userShopProductPictureBackFile,
        } = files
        const createUserShopProduct =
            await this.userShopService.createUserShopProduct(
                shopCreatorId,
                shopId,
                createUserShopProductDto,
                userShopProductPictureFrontFile[0],
                userShopProductPictureLeftFile[0],
                userShopProductPictureRightFile[0],
                userShopProductPictureBackFile[0],
            )
        if (createUserShopProduct instanceof Error) {
            const formattedError = errorFormatter(createUserShopProduct)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json({ errors: formattedError })
        }
        return res.status(HttpStatus.OK).json({
            message: 'User Shop Product Created',
        })
    }
    @Get('/:shopCreatorId/:shopId/products/')
    async getAllProducts(
        @Res() res,
        @Param('shopCreatorId') shopCreatorId,
        @Param('shopId') shopId,
    ) {
        console.log('PRODUCT')
        const allUserShopProducts = await this.userShopService.getAllProducts(
            shopCreatorId,
            shopId,
        )
        if (allUserShopProducts instanceof Error) {
            const formattedError = errorFormatter(allUserShopProducts)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({ allUserShopProducts })
    }
    @Get('/:shopCreatorId/:shopId/products/:productId')
    async getIndividualProduct(
        @Res() res,
        @Param('shopCreatorId') shopCreatorId,
        @Param('shopId') shopId,
        @Param('productId') productId,
    ) {
        console.log('GET PRODUCT')
        const individualUserShopProduct =
            await this.userShopService.getIndividualProduct(
                shopCreatorId,
                shopId,
                productId,
            )
        if (individualUserShopProduct instanceof Error) {
            const formattedError = errorFormatter(individualUserShopProduct)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({ individualUserShopProduct })
    }
}
