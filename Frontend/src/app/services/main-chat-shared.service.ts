import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MainChatSharedService {

  private Api_url = environment.API_URL;
  chat: any = null;
  chatChange: Subject<any> = new Subject<any>();

  addChat: any = null;
  addChatChange: Subject<any> = new Subject<any>();


  constructor(private http: HttpClient)  {
    this.chatChange.subscribe((value) => {
      this.chat = value;
    });
    this.addChatChange.subscribe((data => {
      this.addChat = data;
    }))
  }

  getChat(): any {
    return this.chat;
  }

  setChat(value: any) {
    this.chatChange.next(value);
  }

/*  public getMessages(id: String, page: number){
    return this.http.get<any>(this.Api_url+ 'chats/'+ id + "/" + page);
  }*/

  setNewChat(value:any){
    this.addChatChange.next(value);
  }

}
