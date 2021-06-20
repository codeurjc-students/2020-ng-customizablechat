import {Byte} from "@angular/compiler/src/util";
import * as Buffer from "buffer";

export class Message {
  message: String;
  date: Date;
  sender: String;
  chatId: String;
  type:String;
  buffer:Buffer;

  constructor( message: String, sender: String, chatId: String,type:String, buffer:Buffer) {

    this.message = message;
    this.date = new Date();
    this.sender = sender;
    this.chatId = chatId;
    this.type = type;
    this.buffer = buffer;
  }

}
