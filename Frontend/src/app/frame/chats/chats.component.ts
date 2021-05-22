import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/login";
import {AddContactPrivate, Chat} from "../../models/chat";
import {ChatService} from "../../services/chat.service";
import {MainChatSharedService} from "../../services/main-chat-shared.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UsersService} from "../../services/users.service";



@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  @Input() user : User;

  privateChats:any[] = [];
  groupChats:any[] = [];

  constructor(private chatService:ChatService,
              public mainChat:MainChatSharedService,
              public domSanitizer: DomSanitizer) { }

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
            let chatInfo = data;
            chatInfo.image = this.transformImage({image:chatInfo.image, imageType: chatInfo.imageType})
            this.groupChats.push(chatInfo);
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
          let chatInfo = data;
            this.chatService.obtainImagePrivateChat((data.name == this.user.userName)? data.participants : data.name).subscribe(
              data=>{
                chatInfo.image = this.transformImage(data);
                this.privateChats.push(chatInfo);
              }
            )

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


  transformImage(imageData: any){
    var image;
    if(imageData.imageType != "noType") {
      let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(imageData.image.data)));
      image = this.domSanitizer.bypassSecurityTrustUrl('data:' + imageData.imageType + ';base64, ' + base64String);
    }else{
      image = null;
    }
    return image;
  }
}
