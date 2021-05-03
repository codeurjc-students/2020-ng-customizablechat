import {ObjectId} from "mongoose";

export class CreateMessageDto {
    message: String;
    date: Date;
    sender: String;
    chatId: ObjectId;
    type:String;
    buffer:Buffer;

    constructor(message: String, date: Date, sender: String, chatId: ObjectId, type: String, buffer: Buffer) {
        this.message = message;
        this.date = date;
        this.sender = sender;
        this.chatId = chatId;
        this.type = type;
        this.buffer = buffer;
    }
}

export class SearchMessage {
    message: String;
    chatId: ObjectId;
}