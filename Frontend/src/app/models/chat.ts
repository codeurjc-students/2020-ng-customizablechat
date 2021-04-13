export class Chat {
  name: String;
  description: String;
  creationDate: Date;
  participants: [String];
  isPrivate: Boolean;

  constructor(name:String, description:String,date: Date, participants:[String], isPrivate:boolean) {
    this.name = name;
    this.participants = participants;
    this.isPrivate = isPrivate;
    this.creationDate = date;
    this.description = description;
  }
}

export class AddContactPrivate {
  name: String;
  participants: String;
  isPrivate:Boolean;

  constructor(name:String, participant:String, isPrivate:boolean) {
    this.name = name;
    this.participants = participant;
    this.isPrivate = isPrivate;
  }
}
