import {Body, Controller, Get, Param, Put} from '@nestjs/common';
import {UsersService} from "../Providers/users/users.service";
import {SendChangeColor} from "../DTOs/create-user-dto";
import {ObjectId} from "mongoose";


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Put('color-modes')
    async retrievePageMessages(@Body() change: SendChangeColor){
        return await this.usersService.changeColorMode(change.userName,change.idSettings);
    }

    @Get('images/:user-name')
    async retrieveUserImage(@Param('user-name') userName:String) {
        return this.usersService.getImageProfile(userName);
    }

}
