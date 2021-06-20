import {Message} from "./message";

export class Chat {
  name: String;
  description: String;
  creationDate: Date;
  participants: String[];
  isPrivate: Boolean;
  image: any;
  imageType: String;


  constructor(name: String, description: String, creationDate: Date, participants: String[], isPrivate: Boolean, image: any, imageType: String) {
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
  isPrivate: Boolean;

  constructor(name: String, participant: String, isPrivate: boolean) {
    this.name = name;
    this.participants = participant;
    this.isPrivate = isPrivate;
  }
}


export class ChatMessages {
  chatId: String;
  messageList: Message[];


  constructor(chatId: String, messageList: Message[]) {
    this.chatId = chatId;
    this.messageList = messageList;
  }

}

