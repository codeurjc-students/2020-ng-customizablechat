import {ObjectId} from "mongoose";

export class CreateMessageDto {
    message: String;
    date: Date;
    sender: String;
    chatId: ObjectId;
}

export class SearchMessage {
    message: String;
    chatId: ObjectId;
}