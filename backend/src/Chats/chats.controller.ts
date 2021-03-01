import {Body, Controller, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {AddContactGroup, AddContactPrivate, CreateChatDto} from "../DTOs/create-chat-dto";
import {UsersService} from "../Providers/users/users.service";
import {ChatsService} from "../Providers/chats/chats.service";
import {ObjectId} from "mongoose";
import {MessagesService} from "../Providers/messages/messages.service";
import {SearchMessage} from "../DTOs/create-message-dto";

@Controller('chats')
export class ChatsController {
    constructor(
        private readonly usersService: UsersService,
        private chatsService:ChatsService,
        private readonly messagesService: MessagesService
    ) {}

    @Post('private')
    async createPrivateChat(@Body() chat: AddContactPrivate){
        let contactToAdd = this.usersService.findOneByUsername(chat.participant);

        let chatCreated = await this.chatsService.createChat(chat);

        if(contactToAdd !== undefined){
            this.usersService.addChatToUser(chat.name,chatCreated._id);
            this.usersService.addChatToUser(chat.participant, chatCreated._id);
        }
        return true;
    }

    @Post('group')
    async createGroup(@Body() chat: CreateChatDto){

        let chatCreated = await this.chatsService.createChat(chat);

        this.usersService.addChatToUser(chat.name,chatCreated._id);

        for (let i = 0; i < chat.participants.length; i++) {
            let contactToAdd = this.usersService.findOneByUsername(chat.participants[i]);
            if(contactToAdd !== undefined){
                this.usersService.addChatToUser(chat.participants[i], chatCreated._id);
            }
        }
        return true;
    }

    @Put('group')
    async addContactToGroup(@Body() chat: AddContactGroup){
        let user = await this.usersService.findOneByUsername(chat.participant);
        if(user !== undefined){
            let chatToAdd = await this.chatsService.findOneGroupById(chat.groupId);
            chatToAdd.participants.push(user.userName);
            chatToAdd.save();
            user.chats.unshift(chatToAdd._id);
            user.save();
            if(user.socketId !== null){
                this.chatsService.socket.to(user.socketId).emit("AddedToGroup", chatToAdd);
            }
        }else{
            throw new NotFoundException()
        }
    }

    @Get('/:id/:page')
    async retrievePageMessages(@Param('id') id: ObjectId, @Param('page') page: number){
        return this.messagesService.retrieveMessages(id, page);
    }

    @Get('message')
    async getMessagesThatMatchChat(@Body() search: SearchMessage){
        return this.messagesService.searchMessagesMatchChat(search)
    }
}
