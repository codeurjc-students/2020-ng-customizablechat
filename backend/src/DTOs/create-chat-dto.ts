import {ObjectId} from "mongoose";

export class CreateChatDto {
    name: String;
    description: String;
    creationDate: Date;
    participants: String[];
    isPrivate: Boolean;
}

export class AddContactPrivate {
    name: String;
    participant: String;
    isPrivate:Boolean;
}

export class AddContactGroup {
    groupId: ObjectId;
    participant: String;
}
