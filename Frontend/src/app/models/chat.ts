export class Chat {
}

export class AddContactPrivate {
  name: String;
  participants: String;
  isPrivate:Boolean;

  constructor(name:String, participant:String) {
    this.name = name;
    this.participants = participant;
    this.isPrivate = true;
  }
}
