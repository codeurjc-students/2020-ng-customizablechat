import { Injectable } from '@angular/core';
import {Message} from "./Models/message";
import {HttpClient} from "@angular/common/http";
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class CustomizableChatChatboxService {

  constructor(private http:HttpClient) { }

  public sendMessagePrivate(socket:Socket,socketMessage:string, message: Message) {
    socket.emit(socketMessage, message);
  }

  public sendMessageGroup(socket:Socket, socketMessage:string, message: Message) {
    socket.emit(socketMessage, message);
  }

  public sendFiles(baseUrl:string, messages:any){
    return this.http.post<any>(baseUrl, messages);
  }

  public fileSentMessage(socket:Socket, socketMessage:string, sender:any,messageId:any,chatId:any){
    socket.emit(socketMessage,sender, messageId, chatId);
  }
}
