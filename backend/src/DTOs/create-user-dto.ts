import {ObjectId} from "mongoose";

export class CreateUserDto {
    readonly userName: String;
    readonly name: String;
    readonly surnames: String[];
    readonly socketId: Number;
    readonly active: Boolean;
    readonly idSettings: Number;
    readonly password: String;
    readonly chats: ObjectId[];
}

export class LoginUserDTO{
    readonly userName: String;
    readonly password: String;
}
