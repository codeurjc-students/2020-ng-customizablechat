import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/login";
import {AddContactPrivate, Chat} from "../../models/chat";
import {ChatService} from "../../services/chat.service";
import {Message} from "../../models/message";


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  @Input() user : User;

  privateChats:AddContactPrivate[] = [];
  groupChats:Chat[] = [];
  dataLoaded:boolean = false;

  constructor(public readonly chatService:ChatService) { }

  ngOnInit(): void {
    this.returnPrivateChats();
    this.returnGroupChats();
    this.chatService.sendMessage(new Message("Patata", this.user.userName, this.user.privateChats[0]))
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

  returnPrivateChats(){
    let i = 0;
    while ( i < this.user.privateChats.length && i< 10) {
      console.log(this.user.privateChats[0]);
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

}
