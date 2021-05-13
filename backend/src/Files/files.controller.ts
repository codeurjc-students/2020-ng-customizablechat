import {Body, Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateMessageDto} from "../DTOs/create-message-dto";
import {ObjectId} from "mongoose";
import {MessagesService} from "../Providers/messages/messages.service";
import {ChatsService} from "../Providers/chats/chats.service";

@Controller('files')
export class FilesController {

    constructor(
        private readonly messagesService: MessagesService, private readonly chatsService:ChatsService
    ) {}

    private logger: Logger = new Logger('FilesController');

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Body() body) {
        this.logger.log("Saving file...")
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
}
