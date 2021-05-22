import {Document, ObjectId} from "mongoose";

export interface User extends Document{
    userName: String,
    name: String,
    socketId?: String,
    active: Boolean,
    idSettings: Number,
    password: String,
    privateChats: ObjectId[],
    groupChats: ObjectId[],
    image: Buffer,
    imageType: String,
    description: String,
}
