import {Body, Controller, Get, Logger, Param, Post, Put, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateMessageDto} from "../DTOs/create-message-dto";
import {ObjectId} from "mongoose";
import {MessagesService} from "../Providers/messages/messages.service";
import {ChatsService} from "../Providers/chats/chats.service";
import {UsersService} from "../Providers/users/users.service";

@Controller('files')
export class FilesController {

    constructor(
        private readonly messagesService: MessagesService, private readonly chatsService:ChatsService, private readonly usersService: UsersService
    ) {}

    private logger: Logger = new Logger('FilesController');

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Body() body) {
        this.logger.log("Saving file...");
        var data = await this.messagesService.saveMessage(new CreateMessageDto(file.originalname, new Date(), body.userName,body.chatId, file.mimetype, file.buffer));
        return data;
    }

    @Get(':fileId')
    async getFile(@Param('fileId') fileId:ObjectId) {
        this.logger.log("Asking for the file to receive it");
        const message = await this.messagesService.getFile(fileId);
        const chat = await this.chatsService.findOneGroupById(message.chatId);
        return {message: message, isPrivate:chat.isPrivate}
    }

    @Put('profiles')
    @UseInterceptors(FileInterceptor('image'))
    async changeProfile(@UploadedFile() image, @Body() body) {
        this.logger.log(body);
        this.logger.log("Changing profile")
        const data = await this.usersService.changeProfile({username: body.username, image: image.buffer, imageType: image.mimetype, description:body.description})
        this.logger.log(data);
        if(data != null)
        return true;
    }
}
