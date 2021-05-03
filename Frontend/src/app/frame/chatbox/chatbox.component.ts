import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainChatSharedService} from "../../services/main-chat-shared.service";
import {User} from "../../models/login";
import {Message} from "../../models/message";
import {ChatService} from "../../services/chat.service";
import {Socket} from "ngx-socket-io";
import {Subject} from "rxjs";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  @Input() user: User;
  chatObs: any = null;
  messageList: Message[] ;
  page: number = 0;

  messageData: FormGroup;
  socket: Socket;

  files: File[] = [];

  constructor(public dialog: MatDialog, public mainChat: MainChatSharedService, public chatService: ChatService, private fb: FormBuilder) {
  }

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
    this.onFilesSent();
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.componentInstance.filesChange.subscribe(
      data=>{
        this.files = data;
        for (let i = 0; i < this.files.length; i++) {
          const formData: FormData = new FormData();
          formData.append('file', this.files[i],this.files[i].name);
          formData.append('userName',this.user.userName as string);
          formData.append('chatId',this.chatObs._id as string);
          this.chatService.sendFiles(formData).subscribe(
            e=>{
              if(e!= null){
                console.log("Este es el mensaje que se guardó");
                console.log(e);
                this.chatService.fileSentMessage(e.sender,e._id,e.chatId);
                this.messageList.push(e);
              }
            }
          )
        }
      }
    )
  }

  onSubmit() {
    if (this.messageData.valid) {
      const valueMessage = this.linkGenerator(this.messageData.get("message").value);
      if (valueMessage != "") {
        const newMessage = new Message(valueMessage, this.user.userName, this.chatObs._id, "message", null);
        this.messageData.reset();
        if (this.chatObs.isPrivate) {
          console.log("IsPrivate")
          this.chatService.sendMessagePrivate(newMessage);
        } else {
          console.log("Is a Group")
          this.chatService.sendMessageGroup(newMessage);
        }
      }
    }
  }

  onMessageSent() {
    this.chatService.receiveMessage().subscribe(
      data => {
        console.log(data);
        this.messageList.push(data as Message);
      }
    )
  }

  onFilesSent(){
    this.chatService.receiveFile().subscribe(
      data=>{
        console.log(data);
        console.log("Ese es el id del mensaje")
        this.chatService.getFile(data).subscribe(
          file =>{
            console.log("Llego el fichero")
            console.log(file);
            this.messageList.push(file as Message);
          }
        )
      }
    )
  }

  getMessages() {
    this.mainChat.getMessages(this.chatObs._id, this.page).subscribe(
      messages => {//Igualar o añadir??
        this.messageList = messages;
        this.page++;
      }
    );
  }

  linkGenerator(s: String) {
    var x = s.split(" ");
    for (let i = 0; i < x.length; i++) {
      if (x[i].match("(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")) {
        x[i] = "<a href='" + x[i] + "'>" + x[i] + "</a>";
        console.log("url found")
      }
    }
    return x.join(" ");
  }

  recogniseFileType(type:String){
    if(type == "message"){
      return 0;
    }else if(type == "image/png" || type == "image/jpg" || type == "image/jpeg"){
      return 1;
    }else{
      return 2;
    }
  }

  formatImage(img: any): any {
    console.log(img)
    console.log(img.buffer.data)
    return 'data:'+ img.type+ ';base64,' + img.buffer.data;
  }

}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'fileDialog.html',
})
export class DialogContent {
  files: File[] = [];
  filesChange : Subject<File[]> = new Subject();

  onSelect(event) {
    console.log("On select")
    console.log(event);

    this.files.push(...event.addedFiles);
    console.log(...event.addedFiles)
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  sendFiles(){
    this.filesChange.next(this.files);
  }
}
