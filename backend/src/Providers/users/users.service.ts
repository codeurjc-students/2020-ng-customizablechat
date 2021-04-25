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
        newUser.privateChats = [];
        newUser.groupChats = [];
        newUser.active = false;
        return newUser.save();
    }

    async logout( username: String):Promise<boolean>{
        let value = await this.userModel.findOneAndUpdate({userName:username}, {socketId: null, active: false}, {new:true}).exec();
        return value != undefined;
    }

    findOneBySocketIdAndEraseActivity(socketId: String){
        return this.userModel.findOneAndUpdate({socketId:socketId}, {socketId: null, active: false}).exec();
    }

    findOneBySocketIdAndAddActivity(socketId: String, username: String){
        return this.userModel.findOneAndUpdate({userName:username}, {socketId: socketId, active:true}, {new:true}).exec();
    }

    async addChatToUser(name: String, _id: any, isPrivate:boolean) {
        let user = await this.userModel.findOne({userName:name});

        if(isPrivate) {
            if(user.privateChats == null) user.privateChats = [_id];
            else user.privateChats.unshift(_id);
        }
        else {
            if(user.groupChats == null) user.groupChats = [_id]
            else user.groupChats.unshift(_id);
        }

        user.save();
    }

    changeColorMode(username:String, color: Number){
        return this.userModel.findOneAndUpdate({userName:username}, {idSettings: color}, {new:true}).exec();
    }

}
