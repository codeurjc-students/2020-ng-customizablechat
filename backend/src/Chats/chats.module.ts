import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ChatsGateway} from "./chats.gateway";
import { ChatsService } from '../Providers/chats/chats.service';
import {UserSchema} from '../Schemas/user.schema';
import { ChatsController } from './chats.controller';


@Module(
    {imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
    controllers: [ChatsGateway, ChatsController],
    providers: [ChatsService]})
export class ChatsModule {

}
