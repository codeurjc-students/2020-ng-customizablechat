export class Login {
  userName: String;
  password: String;

  constructor(userName: string, password: string) {
    this.userName = userName;
    this.password = password;
  }
}

export class User {
  userName: String;
  name: String;
  socketId?: String;
  active: Boolean;
  idSettings: Number;
  password: String;
  privateChats: String[];
  groupChats: String[];
  image: any;
  description:String


  constructor(userName: String, name: String, socketId: String, active: Boolean, idSettings: Number, password: String, privateChats: String[], groupChats: String[], image: any, description: String) {
    this.userName = userName;
    this.name = name;
    this.socketId = socketId;
    this.active = active;
    this.idSettings = idSettings;
    this.password = password;
    this.privateChats = privateChats;
    this.groupChats = groupChats;
    this.image = image;
    this.description = description;
  }
}

export class CreateUser {
  userName: String;
  name: String;
  socketId?: String;
  active: Boolean;
  idSettings: Number;
  password: String;
  privateChats: String[];
  groupChats: String[];
  image: File;
  description:String;

  constructor(userName: String, name: String, password: String,) {
    this.name = name;
    this.userName = userName;
    this.password = password;
  }
}

export class SendChangeColor {
  userName: String;
  idSettings: Number;


  constructor(username: String, idSettings: Number) {
    this.userName = username;
    this.idSettings = idSettings;
  }
}

export class SendChangeProfile {
  username: String;
  image: File;
  description: String;


  constructor(username: String, image: File, description: String) {
    this.username = username;
    this.image = image;
    this.description = description;
  }
}
