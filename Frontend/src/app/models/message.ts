export class Message {
  message: String;
  date: Date;
  sender: String;
  chatId: String;

  constructor( message: String, sender: String, chatId: String) {

    this.message = message;
    this.date = new Date();
    this.sender = sender;
    this.chatId = chatId;
  }

}
