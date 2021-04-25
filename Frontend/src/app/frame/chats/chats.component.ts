import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/login";
import {AddContactPrivate, Chat} from "../../models/chat";
import {ChatService} from "../../services/chat.service";
import {MainChatSharedService} from "../../services/main-chat-shared.service";


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  @Input() user : User;

  privateChats:AddContactPrivate[] = [];
  groupChats:Chat[] = [];
  dataLoaded:boolean = false;

  constructor(private chatService:ChatService, public mainChat:MainChatSharedService) { }

  ngOnInit(): void {
    this.returnPrivateChats();
    this.returnGroupChats();
    // this.chatService.sendMessage(new Message("This is a test", this.user.userName, this.user.privateChats[0]))
  }

  returnGroupChats(){
    let i = 0;
    while( i < this.user.groupChats.length && i < 10) {
      this.chatService.getChat(this.user.groupChats[i]).subscribe(
        data=>{
          this.groupChats.push(data);
        },failure=>{
          console.log(failure);
        }
      );
      i++;
    }
    this.dataLoaded = true;
  }

  getPrivateChats(){
    return this.privateChats;
  }

  getGroupChats(){
    return this.groupChats;
  }

  returnPrivateChats(){
    let i = 0;
    while ( i < this.user.privateChats.length && i< 10) {
      this.chatService.getChat(this.user.privateChats[i]).subscribe(
        data=>{
          this.privateChats.push(data);
        },failure=>{
          console.log(failure);
        }
      );
      i++;
    }
  }

  changeMainChat(value:any){
    this.mainChat.setChat(value);
  }

}
