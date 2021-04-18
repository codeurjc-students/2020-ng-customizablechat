import { Injectable } from '@angular/core';
import {User} from "../models/login";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Message} from "../models/message";

@Injectable({
  providedIn: 'root'
})
export class MainChatSharedService {

  private Api_url = environment.API_URL;
  chat: any = null;
  chatChange: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient)  {
    this.chatChange.subscribe((value) => {
      this.chat = value
    });
  }

  getChat(): any {
    return this.chat;
  }

  setChat(value: any) {
    console.log("Setteo el chat");
    console.log(value);
    this.chatChange.next(value);
  }

  public getMessages(id: String, page: number){
    return this.http.get<any>(this.Api_url+ 'chats/'+ id + "/" + page);
  }

}
