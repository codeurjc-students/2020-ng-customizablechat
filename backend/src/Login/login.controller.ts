import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {User} from "../Interfaces/user.interface";
import {UsersService} from "../Providers/users/users.service";
import {CreateUserDto, LoginUserDTO} from "../DTOs/create-user-dto";

@Controller('sign')
export class LoginController {
    constructor(private readonly usersService: UsersService) {}

    @Post('in')
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

}

@Controller('logout')
export class LogoutController{
    constructor(private readonly usersService: UsersService) {}

    @Post(':userName')
    async logout(@Param('userName') userName){
        if( this.usersService.findOneByUsername(userName)!= undefined){
            return await this.usersService.logout(userName);
        }
        return false;
    }
}
