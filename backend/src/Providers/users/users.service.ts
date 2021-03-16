import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../../Interfaces/user.interface";
import {CreateUserDto} from "../../DTOs/create-user-dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async findOneByUsername(name: String): Promise<User> {
        return this.userModel.findOne({ userName: name });
    }

    async createUser( user: CreateUserDto): Promise<User>{
        let newUser = new this.userModel(user);
        newUser.socketId = null;
        newUser.idSettings = 1;
        newUser.chats = [];
        return newUser.save();
    }

    async logout( username: String):Promise<boolean>{
        let value = await this.userModel.findOneAndUpdate({userName:username}, {socketId: null, active: false}, {new:true});
        return value != undefined;
    }

    findOneBySocketIdAndEraseActivity(socketId: Number){
        return this.userModel.findOneAndUpdate({socketId:socketId}, {socketId: null, active: false})
    }

    findOneBySocketIdAndAddActivity(socketId: Number, username: String){
        return this.userModel.findOneAndUpdate({userName:username}, {socketId: socketId, active: true})
    }

    addChatToUser(name: String, _id: any) {
        
    }
}
