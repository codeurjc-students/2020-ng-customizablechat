import {Document, ObjectId} from "mongoose";

export interface Message extends Document {
    message: String;
    date: Date;
    sender: String;
    chatId: ObjectId;
    type:String;
    buffer:Buffer;
}
