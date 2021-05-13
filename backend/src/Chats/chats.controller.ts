import {
    Body,
    Controller,
    Get, Logger,
    NotFoundException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {AddContactGroup, AddContactPrivate, CreateChatDto} from "../DTOs/create-chat-dto";
import {UsersService} from "../Providers/users/users.service";
import {ChatsService} from "../Providers/chats/chats.service";
import {ObjectId} from "mongoose";
import {MessagesService} from "../Providers/messages/messages.service";
import {CreateMessageDto, SearchMessage} from "../DTOs/create-message-dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('chats')
export class ChatsController {
    constructor(
        private readonly usersService: UsersService,
        private chatsService:ChatsService,
        private readonly messagesService: MessagesService
    ) {}

    private logger: Logger = new Logger('ChatsController');

    @Post('private')
    async createPrivateChat(@Body() chat: AddContactPrivate){
        let contactToAdd = this.usersService.findOneByUsername(chat.participants);

        if(contactToAdd !== undefined){
            let chatNew = new CreateChatDto(chat.name, true, "", new Date(), chat.participants);
            let value = await this.chatsService.findChatPrivateExistence(chat.name, chat.participants);
            if(value == null){
                let chatCreated = await this.chatsService.createChat(chatNew);
                this.usersService.addChatToUser(chat.name,chatCreated._id,true);
                this.usersService.addChatToUser(chat.participants, chatCreated._id,true);
                this.logger.log(chatCreated)
                return chatCreated;
            }
        }
        return null;
    }

    @Post('group')
    async createGroup(@Body() chat: CreateChatDto){
        console.log(chat);
        let chatCreated = await this.chatsService.createChat(chat);

        for (let i = 0; i < chat.participants.length; i++) {
            let contactToAdd = this.usersService.findOneByUsername(chat.participants[i]);
            if(contactToAdd !== undefined){
                this.usersService.addChatToUser(chat.participants[i], chatCreated._id,false);
            }
        }
        return chatCreated;
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

    @Get(':id/:page')
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
