import {Document} from "mongoose";

export interface Chat extends Document {
    name: String;
    description: String;
    creationDate: Date;
    participants: any;
    isPrivate: Boolean;
}
