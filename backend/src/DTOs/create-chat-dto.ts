import {ObjectId} from "mongoose";

export class CreateChatDto {
    constructor(name: String, isPrivate:boolean, description: String,date: Date,  participants : any) {
        this.name = name;
        this.isPrivate= isPrivate;
        this.description = description;
        this.creationDate = date;
        this.participants = participants;
    }

    name: String;
    description: String;
    creationDate: Date;
    participants: any;
    isPrivate: Boolean;
}

export class AddContactPrivate {
    name: String;
    participants: String;
    isPrivate:Boolean;
}

export class AddContactGroup {
    groupId: ObjectId;
    participant: String;
}
