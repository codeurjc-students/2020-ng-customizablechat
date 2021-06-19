import {Body, Controller, Post, Put} from '@nestjs/common';
import {UsersService} from "../Providers/users/users.service";
import {CreateUserDto, LoginUserDTO} from "../DTOs/create-user-dto";

@Controller('sign')
export class LoginController {
    constructor(private readonly usersService: UsersService) {}

    @Put('in')
    async loginUser(@Body() user: LoginUserDTO){
        let userPromise = await this.usersService.findOneByUsername(user.userName);
        if(userPromise?.password === user.password){
            return userPromise;
        }
        return null;
    }

    @Post('up')
    async signUp(@Body() userData: CreateUserDto){
        let user = await this.usersService.findOneByUsername(userData.userName);
        if(user === null) return await this.usersService.createUser(userData);
        else return null;
    }

    @Put('out')
    async logout(@Body() user:LoginUserDTO){
        let data = await this.usersService.findOneByUsername(user.userName);
        if( data != undefined && data.password == user.password){
            let logoutResult =  await this.usersService.logout(user.userName);
            this.usersService.findOneBySocketIdAndEraseActivity(data.socketId);
            return logoutResult;
        }
        return false;
    }
}
