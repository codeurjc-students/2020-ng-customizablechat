

export class Login{
  userName: String;
  password: String;

  constructor(userName:string, password:string) {
    this.userName = userName;
    this.password = password;
  }
}

export class User{
  userName: String;
  name: String;
  socketId?: Number;
  active: Boolean;
  idSettings: Number;
  password: String;
  chats: String[];

  constructor(userName: String,
  name: String,
  socketId: Number,
  active: Boolean,
  idSettings: Number,
  password: String,
  chats: String[]) {
    this.name = name;
    this.socketId = socketId;
    this.active = active;
    this.idSettings = idSettings;
    this.password = password;
    this.chats = chats;
  }
}

export class CreateUser{
  userName: String;
  name: String;
  socketId?: Number;
  active: Boolean;
  idSettings: Number;
  password: String;
  chats: String[];

  constructor(userName: String, name: String, password: String,) {
    this.name = name;
    this.userName = userName;
    this.password = password;
  }
}
