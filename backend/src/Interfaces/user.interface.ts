import {Document, ObjectId} from "mongoose";

export interface User extends Document{
    userName: String,
    name: String,
    socketId?: Number,
    active: Boolean,
    idSettings: Number,
    password: String,
    chats: ObjectId[],
}
