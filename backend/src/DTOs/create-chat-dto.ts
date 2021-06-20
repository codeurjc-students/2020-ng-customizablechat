import {ObjectId} from "mongoose";

export class CreateChatDto {

    name: String;
    description: String;
    creationDate: Date;
    participants: any;
    isPrivate: Boolean;
    image:Buffer;
    imageType:String;


    constructor(name: String, description: String, creationDate: Date, participants: any, isPrivate: Boolean, image: Buffer, imageType: String) {
        this.name = name;
        this.description = description;
        this.creationDate = creationDate;
        this.participants = participants;
        this.isPrivate = isPrivate;
        this.image = image;
        this.imageType = imageType;
    }
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
