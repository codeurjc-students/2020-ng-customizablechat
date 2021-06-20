import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ChatsGateway} from "./chats.gateway";
import { ChatsService } from '../Providers/chats/chats.service';
import {UserSchema} from '../Schemas/user.schema';
import { ChatsController } from './chats.controller';
import {MessagesService} from "../Providers/messages/messages.service";
import {UsersService} from "../Providers/users/users.service";
import {ChatSchema} from "../Schemas/chat.schema";
import {MessageSchema} from "../Schemas/message.schema";


@Module(
    {imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'Chat', schema: ChatSchema },
        { name: 'Message', schema: MessageSchema }])],
    controllers: [ChatsController],
    providers: [ChatsService, ChatsGateway, MessagesService, UsersService]})
export class ChatsModule {

}
