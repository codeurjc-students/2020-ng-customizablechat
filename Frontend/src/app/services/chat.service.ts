import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Message} from "../models/message";
import {AddContactPrivate} from "../models/chat";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private Api_url = environment.API_URL;

  constructor(private socket: Socket, private http: HttpClient) {
  }

  public saveSocket(username){
    console.log(username)
    console.log("Esto debería funcionar")
    this.socket.emit("saveSocket", username);
  }

  public sendMessage(message: Message) {
    this.socket.emit('sendMessage', message);
    console.log("Has hecho lo que tenias");
  }

  public addPrivateChat(newContact: AddContactPrivate){
    return this.http.post<any>(this.Api_url+ 'chats/private', newContact);
  }

  public getChat(id: String){
    return this.http.get<any>(this.Api_url+ 'chats/'+id);
  }
}
