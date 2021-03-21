import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ChatsModule} from "./Chats/chats.module";
import {LoginModule} from "./Login/login.module";

@Module({
  imports: [
    ChatsModule,
    LoginModule,
    MongooseModule.forRoot('mongodb+srv://ng-customizable-chat:CustomChatng1@tfg.4hfnj.mongodb.net/TFG?retryWrites=true&w=majority', { useFindAndModify: false })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
