import {Document, ObjectId} from "mongoose";

export interface Chat extends Document {
    name: String;
    description: String;
    creationDate: Date;
    participants: String[];
    isPrivate: Boolean;
}
