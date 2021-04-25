import {ObjectId} from "mongoose";

export class CreateUserDto {
    readonly userName: String;
    readonly name: String;
    readonly socketId: String;
    readonly active: Boolean;
    readonly idSettings: Number;
    readonly password: String;
    readonly privateChats: ObjectId[];
    readonly groupChats: ObjectId[];
}

export class LoginUserDTO{
    readonly userName: String;
    readonly password: String;
}


export class SendChangeColor{
    userName:String;
    idSettings:Number;
}