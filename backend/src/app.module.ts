import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './Controllers/Chats/chats.module';
import { LoginModule } from './Controllers/Login/login.module';
import { UsersModule } from './Controllers/Users/users.module';
import { FilesModule } from './Controllers/Files/files.module';

@Module({
  imports: [
    ChatsModule,
    LoginModule,
    UsersModule,
    FilesModule,
    MongooseModule.forRoot(
      'mongodb+srv://ng-customizable-chat:CustomChatng1@tfg.4hfnj.mongodb.net/TFG?retryWrites=true&w=majority',
      { useFindAndModify: false },
    ),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
