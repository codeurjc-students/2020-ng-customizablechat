import {Body, Controller, Post, Put} from '@nestjs/common';
import {UsersService} from "../Providers/users/users.service";
import {SendChangeColor} from "../DTOs/create-user-dto";


@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Put('color-modes')
    async retrievePageMessages(@Body() change: SendChangeColor){
        return await this.usersService.changeColorMode(change.userName,change.idSettings);
    }

}
