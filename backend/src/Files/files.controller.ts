import {Body, Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {CreateMessageDto} from "../DTOs/create-message-dto";
import {ObjectId} from "mongoose";
import {MessagesService} from "../Providers/messages/messages.service";

@Controller('files')
export class FilesController {

    constructor(
        private readonly messagesService: MessagesService
    ) {}

    private logger: Logger = new Logger('FilesController');

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file, @Body() body) {
        this.logger.log("Saving file...")
        let data = await this.messagesService.saveMessage(new CreateMessageDto(file.originalname, new Date(), body.userName,body.chatId, file.mimetype, file.buffer));
        return data;
    }

    @Get(':fileId')
    getFile(@Param('fileId') fileId:ObjectId) {
        this.logger.log("Asking for the file to receive it");
        return this.messagesService.getFile(fileId);
    }
}
