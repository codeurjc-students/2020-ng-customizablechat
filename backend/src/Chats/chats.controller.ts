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
        let contactToAdd = this.usersService.findOneByUsername(chat.participants);

        if(contactToAdd !== undefined){
            let chatNew = new CreateChatDto(chat.name, true, "", chat.participants);
            let chatCreated = await this.chatsService.createChat(chatNew);
            this.usersService.addChatToUser(chat.name,chatCreated._id,true);
            this.usersService.addChatToUser(chat.participants, chatCreated._id,true);
            return true;
        }
        return false;
    }

    @Post('group')
    async createGroup(@Body() chat: CreateChatDto){

        let chatCreated = await this.chatsService.createChat(chat);

        this.usersService.addChatToUser(chat.name,chatCreated._id,false);

        for (let i = 0; i < chat.participants.length; i++) {
            let contactToAdd = this.usersService.findOneByUsername(chat.participants[i]);
            if(contactToAdd !== undefined){
                this.usersService.addChatToUser(chat.participants[i], chatCreated._id,false);
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

            this.usersService.addChatToUser(user.userName,chatToAdd._id,false);

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
    getMessagesThatMatchChat(@Body() search: SearchMessage){
        return this.messagesService.searchMessagesMatchChat(search)
    }

    @Get(':id')
    getChat(@Param('id') id: ObjectId){
        return this.chatsService.findOneGroupById(id);
    }
}
