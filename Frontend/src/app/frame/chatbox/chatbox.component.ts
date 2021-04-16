import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";
import {MainChatSharedService} from "../../services/main-chat-shared.service";
import {User} from "../../models/login";
import {Observable} from "rxjs";
import {Message} from "../../models/message";
import {ChatService} from "../../services/chat.service";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  @Input() user: User;
  chatObs: any = null;
  messageList: Message[];
  page: number;

  messageData = new FormGroup ({
    message: new FormControl()
  });

  message: string = this.messageData.controls['message'].value;

  constructor(public dialog:MatDialog, public mainChat:MainChatSharedService, public chatService:ChatService) { }

  ngOnInit(): void {
    this.page = 0;
    this.messageList = [];
    this.mainChat.chatChange.subscribe(
      data => {
        this.chatObs = data;
        console.log("----->El Chat")
        console.log(data)
        this.mainChat.getMessages(this.chatObs._id, this.page).subscribe(
          data2 =>{
            this.messageList = data2;
            console.log("----->Los mensajes")
            console.log(data2);
          }
        );
        this.page = 0;
        this.messageList.push(new Message("patata", "60708dde77b9920364d1be1e", "60747a42c99c1902fe482867"));
      }

    )
  }


  openDialog(){
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit(){
    this.message = this.messageData.controls['message'].value;
    console.log(this.message);
    if(this.message != null){
      this.chatService.sendMessage(new Message(this.message, this.user.userName, this.chatObs._id));
    }
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
