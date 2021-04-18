import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainChatSharedService} from "../../services/main-chat-shared.service";
import {User} from "../../models/login";
import {Observable} from "rxjs";
import {Message} from "../../models/message";
import {ChatService} from "../../services/chat.service";
import {Socket} from "ngx-socket-io";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  @Input() user: User;
  chatObs: any = null;
  messageList: Message[];
  page: number = 0;

  messageData: FormGroup;
  socket: Socket;


  constructor(public dialog:MatDialog, public mainChat:MainChatSharedService, public chatService:ChatService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.socket = this.chatService.socket;
    this.messageData = this.fb.group({
      message: ['', Validators.required],
    });
    this.messageList = [];
    this.mainChat.chatChange.subscribe(
      data => {
        this.chatObs = data;
        this.page = 0;
        this.getMessages();
      }

    );
    this.onMessageSent();
  }


  openDialog(){
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit(){
    if(this.messageData.valid){
      const newMessage = new Message(this.messageData.get("message").value , this.user.userName, this.chatObs._id);
      this.messageData.reset();
      if(this.chatObs.isPrivate){
        this.chatService.sendMessagePrivate(newMessage);
      }else {
        this.chatService.sendMessageGroup(newMessage);
      }
    }
  }
  onMessageSent(){
    this.chatService.getMessage().subscribe(
      data =>{
        console.log(data);
        this.messageList.push(data as Message);
      }
    )
  }

  getMessages(){
    this.mainChat.getMessages(this.chatObs._id, this.page).subscribe(
      messages =>{
        this.messageList = messages;
        this.page++;
      }
    );
  }

}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'fileDialog.html',
})
export class DialogContent {
  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
