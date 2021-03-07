export class Login{
  readonly userName: String;
  readonly password: String;

  constructor(userName:string, password:string) {
    this.userName = userName;
    this.password = password;
  }
}
