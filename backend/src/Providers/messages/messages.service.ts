import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, ObjectId} from "mongoose";
import {Message} from "../../Interfaces/message.interface";
import {CreateMessageDto, SearchMessage} from "../../DTOs/create-message-dto";
import * as mongoose from "mongoose";

@Injectable()
export class MessagesService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

    private logger: Logger = new Logger('MessagesService');

    async saveMessage(message:CreateMessageDto){
        let newMessage = new this.messageModel(message);
        return newMessage.save();
    }

    async retrieveMessages(chatId: ObjectId, page: number){
        this.logger.log("Retrieving messages")
        let value = await this.messageModel.find( {chatId: chatId}).sort({_id: -1}).skip(page*10).limit(10).exec();
        return value.reverse();
    }

    async searchMessagesMatchChat(match: SearchMessage){
        return this.messageModel.find({message: ('/'+ match.message + '/'), chatId: match.chatId});
    }

    async getFile(fileId:ObjectId){
        return this.messageModel.findOne({_id:fileId});
    }

}
