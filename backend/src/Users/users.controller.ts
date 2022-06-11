import { Body, Controller, Get, Logger, Param, Put } from '@nestjs/common';
import { UsersService } from '../Providers/users/users.service';
import { SendChangeColor } from '../DTOs/create-user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private logger: Logger = new Logger('UsersController');

  @Put('color-modes')
  async changeColorMode(@Body() change: SendChangeColor) {
    return await this.usersService.changeColorMode(
      change.userName,
      change.idSettings,
    );
  }

  @Get('images/:userName')
  async retrieveUserImage(@Param('userName') userName: string) {
    return this.usersService.getImageProfile(userName);
  }
}
