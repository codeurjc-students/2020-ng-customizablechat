import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {Message} from "../models/message";
import {AddContactPrivate, Chat} from "../models/chat";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private Api_url = environment.API_URL;

  constructor(public socket: Socket, private http: HttpClient) {
  }

  public saveSocket(username){
    this.socket.emit("saveSocket", username);
  }

  public sendMessagePrivate(message: Message) {
    this.socket.emit('sendMessagePrivate', message);
  }

  public sendMessageGroup(message: Message) {
    this.socket.emit('sendMessageGroup', message);
  }

  public sendFiles(messages:any){
    return this.http.post<any>(this.Api_url + 'files', messages);
  }

  public fileSentMessage(sender:any,messageId:any,chatId:any){
    this.socket.emit('fileSentMessage',sender, messageId, chatId);
  }

  public addPrivateChat(newContact: AddContactPrivate){
    return this.http.post<any>(this.Api_url+ 'chats/private', newContact);
  }

  public createGroupChat(newChat: any){
    return this.http.post<any>(this.Api_url+ 'chats/group', newChat);
  }

  public getChat(id: String){
    return this.http.get<any>(this.Api_url+ 'chats/'+id);
  }

  public receiveMessage(){
    return this.socket.fromEvent('messageSent');
  }

  public receiveFile(){
    return this.socket.fromEvent('fileReceived');
  }

  public getFile(fileId:any) {
    console.log("Service asking for file", fileId)
    return this.http.get<any>(this.Api_url + 'files/'+ fileId)
  }

  public obtainImagePrivateChat(user:any){
    return this.http.get<any>(this.Api_url+ 'users/images/'+ user);
  }
}
