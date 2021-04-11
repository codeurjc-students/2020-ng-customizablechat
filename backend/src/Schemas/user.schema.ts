import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    userName: String,
    name: String,
    socketId: Number,
    active: Boolean,
    idSettings: Number,
    password: String,
    privateChats: [mongoose.Types.ObjectId],
    groupChats: [mongoose.Types.ObjectId]
});
