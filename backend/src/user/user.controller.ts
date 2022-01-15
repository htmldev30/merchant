import {
    Body,
    Controller,
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

import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateUserProfileDto } from './dto/create-user-profile.dto'
import { SellerRequestDto } from './dto/seller-request.dto'
import { errorFormatter } from './others/error.formatter'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userProfileId')
    async getUserProfile(@Res() res, @Param('userProfileId') userProfileId) {
        const userProfile = await this.userService.getUserProfile(userProfileId)
        console.log(userProfile)
        if (userProfile instanceof Error) {
            const formattedError = errorFormatter(userProfile)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }

        return res.status(HttpStatus.OK).json({ userProfile })
    }
    // // Register As Seller
    @Get('/seller-request/:userProfileId')
    async getSellerRequest(@Res() res, @Param('userProfileId') userProfileId) {
        const sellerRequest = await this.userService.getSellerRequest(
            userProfileId,
        )
        if (sellerRequest instanceof Error) {
            const formattedError = errorFormatter(sellerRequest)
            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({ sellerRequest })
    }
    @Post('/seller-request')
    async sellerRequest(
        @Res() res,
        @Body() sellerRequestDto: SellerRequestDto,
    ) {
        const newSeller = await this.userService.createSellerRequest(
            sellerRequestDto,
        )
        if (newSeller instanceof Error) {
            const formattedError = errorFormatter(newSeller)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({
            message: 'Request Made Successfully',
        })
    }
    @Post()
    async createUserProfile(
        @Res() res,
        @Body() createUserProfileDto: CreateUserProfileDto,
    ) {
        const newUserProfile = await this.userService.createUserProfile(
            createUserProfileDto,
        )
        // Lets frontend know it's an error
        if (newUserProfile instanceof Error) {
            const formattedError = errorFormatter(newUserProfile)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }
        return res.status(HttpStatus.OK).json({
            message: 'User Profile Created',
        })
    }

    @Put('/:userId')
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'userProfilePictureFile', maxCount: 1 },
        ]),
    )
    async updateUserProfile(
        @Res() res,
        @Param('userId') userId: string,
        @Body() updateUserProfileDto: CreateUserProfileDto,
        @UploadedFiles() files,
    ) {
        const { userProfilePictureFile } = files
        const givenProfilePicture = []
        if (userProfilePictureFile) {
            givenProfilePicture.push(userProfilePictureFile[0])
        }

        const updatedUserProfile = await this.userService.updateUserProfile(
            userId,
            updateUserProfileDto,
            ...givenProfilePicture,
        )
        // Lets frontend know it's an error
        if (updatedUserProfile instanceof Error) {
            const formattedError = errorFormatter(updatedUserProfile)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }

        return res.status(HttpStatus.OK).json({
            message: 'User Updated',
        })
    }
}
