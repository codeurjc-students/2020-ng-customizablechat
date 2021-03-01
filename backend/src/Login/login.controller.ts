import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {User} from "../Interfaces/user.interface";
import {UsersService} from "../Providers/users/users.service";
import {CreateUserDto, LoginUserDTO} from "../DTOs/create-user-dto";

@Controller('sign')
export class LoginController {
    constructor(private readonly usersService: UsersService) {}

    @Post('in')
    async loginUser(@Body() user: LoginUserDTO): Promise<Boolean>{
        let userPromise = await this.usersService.findOneByUsername(user.userName)
        if(userPromise.active == true) {
            return false;
        }
        return userPromise.password === user.password;
    }

    @Post('up')
    async signUp(@Body() userData: CreateUserDto): Promise<User>{
        return  await this.usersService.createUser(userData)
    }

}

@Controller('logout')
export class LogoutController{
    constructor(private readonly usersService: UsersService) {}

    @Post(':userName')
    async logout(@Param('userName') userName){
        if( this.usersService.findOneByUsername(userName)!= undefined){
            this.usersService.logout(userName);
            return true;
        }
        return false;
    }
}
