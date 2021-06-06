import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../../Interfaces/user.interface";
import {Model, ObjectId} from "mongoose";
import {Chat} from "../../Interfaces/chat.interface";
import {Server} from 'socket.io'

@Injectable()
export class ChatsService {

    public socket: Server = null;

    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                @InjectModel('Chat') private readonly chatModel: Model<Chat>) {}


    async createChat(chat: any):Promise<Chat> {
        const newChat = new this.chatModel(chat);
        return newChat.save();
    }

    async findOneGroupById(idChat: ObjectId){
        return this.chatModel.findOne({_id: idChat});
    }

    // Future use if need to check chats created
    async findChatPrivateExistence(name: String, person:String){
        return this.chatModel.findOne({$or:[{name: name, participants: person},{name: person, participants: name}]}).exec();
    }
}
