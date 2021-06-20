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

  public getMessages(baseUrl:string, id: String, page: number){
    return this.http.get<any>(baseUrl+ 'chats/'+ id + "/" + page);
  }

  public receiveMessage(socket:Socket, socketMessage:string){
    return socket.fromEvent(socketMessage);
  }

  public receiveFile(socket:Socket, socketMessage:string){
    return socket.fromEvent(socketMessage);
  }

  public getFile(baseUrl:string, fileId:any) {
    console.log("Service asking for file", fileId)
    return this.http.get<any>(baseUrl + 'files/'+ fileId)
  }
}
