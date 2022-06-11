import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../Schemas/user.schema';
import { UsersService } from '../Providers/users/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [LoginController],
  providers: [UsersService],
})
export class LoginModule {}
