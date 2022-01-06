import {
    Controller,
    Body,
    Get,
    HttpStatus,
    Param,
    ParseUUIDPipe,
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
@Controller('user-shop')
export class UserShopController {
    constructor(private userShopService: UserShopService) {}

    @Get('/:shopCreatorId')
    async getUserShop(
        @Res() res,
        @Param('shopCreatorId', new ParseUUIDPipe()) shopCreatorId,
    ) {
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
        @Param('shopCreatorId', new ParseUUIDPipe()) shopCreatorId: string,
        @Body() updateUserShopDto: CreateUserShopDto,
        @UploadedFiles() files,
    ) {
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
}
