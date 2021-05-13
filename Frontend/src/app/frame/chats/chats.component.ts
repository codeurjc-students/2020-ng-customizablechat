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

  constructor(private chatService:ChatService, public mainChat:MainChatSharedService) { }

  ngOnInit(): void {
    this.returnPrivateChats();
    this.returnGroupChats();
    this.onChatAdded();
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

  onChatAdded(){
    this.mainChat.addChatChange.subscribe(
      chat => {
        if(chat.isPrivate){
          if(this.privateChats != []){
            this.privateChats.unshift(chat);
          }else{
            this.privateChats = [chat]
          }
        }else{
          if(this.groupChats != []) {
            this.groupChats.unshift(chat);
          }else {
            this.groupChats = [chat];
          }
        }
      }
    )
  }

}
