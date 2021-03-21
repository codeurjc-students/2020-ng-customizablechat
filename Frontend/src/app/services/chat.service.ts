import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) {
  }

  public saveSocket(username){
    console.log(this.socket);
    this.socket.emit("saveSocket", this.socket, username);
  }

}
