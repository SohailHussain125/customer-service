import { Controller, Get, Post, Param, Body, UploadedFile, UseInterceptors ,BadRequestException, UseGuards} from "@nestjs/common";
import { ResgistrationType, ResponseResgistrationType, loginType, loginTypeResponse } from './dto/authentication.dto';
import { AuthenticationService } from './authentication.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from "multer";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./local-auth-guard";



@Controller()
export class AuthenticationController {
    constructor(private authenticationService: AuthenticationService) { }

    // SignUp end point
    @Post('/registeration')
    async registeration(
        @Body() body: ResgistrationType
    ) {
        const user = await this.authenticationService.registeration(body);
        return user;
    }


    // Login end point
//   @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(
        @Body() body: loginType
    ): Promise<loginTypeResponse> {
        return this.authenticationService.login(body)
    }


    // Upload image
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                const fileNameSplit = file.originalname.split(".");
                const fileExt = fileNameSplit[fileNameSplit.length - 1]
                cb(null, `${Date.now()}.${fileExt}`)
            }
        }),
        fileFilter: (req, file, callback) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback( new BadRequestException('Only image files are allowed!'), false);
            }
            callback(null, true);
        }
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
            return file
    }

}