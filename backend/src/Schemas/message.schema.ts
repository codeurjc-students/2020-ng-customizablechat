import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
    message: String,
    date: Date,
    sender: String,
    chatId: mongoose.Types.ObjectId,
    type:String,
    buffer:Buffer,
});