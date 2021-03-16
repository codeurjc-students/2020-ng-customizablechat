import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userName: String,
    name: String,
    socketId: Number,
    active: Boolean,
    idSettings: Number,
    password: String,
    chats: [mongoose.Types.ObjectId],
});
