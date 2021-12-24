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

import {
    FileFieldsInterceptor,
    FileInterceptor,
    FilesInterceptor,
} from '@nestjs/platform-express'
import { CreateUserProfileDto } from './dto/create-user-profile.dto'
import { errorFormatter } from './others/error.formatter'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/:userProfileId')
    async getUserProfile(
        @Res() res,
        @Param('userProfileId', new ParseUUIDPipe()) userProfileId,
    ) {
        const userProfile = await this.userService.getUserProfile(userProfileId)
        if (userProfile instanceof Error) {
            const formattedError = errorFormatter(userProfile)

            return res
                .status(HttpStatus.BAD_REQUEST)
                .send({ error: formattedError })
        }

        return res.status(HttpStatus.OK).json({ userProfile })
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
        FileFieldsInterceptor([{ name: 'profilePictureFile', maxCount: 1 }]),
    )
    async updateUserProfile(
        @Res() res,
        @Param('userId', new ParseUUIDPipe()) userId: string,
        @Body() updateUserProfile: CreateUserProfileDto,
        @UploadedFiles() files,
    ) {
        const { profilePictureFile } = files
        const updatedUserProfile = await this.userService.updateUserProfile(
            userId,
            updateUserProfile,
            profilePictureFile,
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
