import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {Socket} from "ngx-socket-io";
import {CustomizableChatChatboxService} from "./customizable-chat-chatbox.service";
import {ImageDialogContent} from "./image-dialog-content/image-dialog-content.component";
import {Message} from "./Models/message";

@Component({
  selector: 'cc-customizable-chat-chatbox',
  templateUrl: './customizable-chat-chatbox.html',
  styleUrls: ['./assets/customizable-chat-chatbox.scss']
})
export class CustomizableChatChatboxComponent implements OnChanges, OnInit {

  @Input() user: any;
  @Input() chatObs: any;
  @Input() socket: Socket;
  @Input() listUrls: string[];
  @Input() listChatsPrivate: any[];
  @Input() listChatsGroup: any[];

  files: File[] = [];

  public textArea = "";
  public isEmojiPickerVisible: boolean;

  chatContent: boolean = false;
  startAnimation: boolean = false;

  page: number = 0;
  position: number;

  constructor(public dialog: MatDialog, private domSanitizer: DomSanitizer, private chatboxService: CustomizableChatChatboxService) {
  }

  ngOnInit(): void {
    this.onMessageSent(); //TODO
    this.onFilesSent(); //TODO
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'chatObs': {
            console.log("Esto funciona");
            console.log(this.chatObs);
            if (this.chatObs) {
              this.page = 0;
              if (this.chatObs.isPrivate) {
                this.position = this.findChatInList(this.listChatsPrivate, this.chatObs._id)
                if (this.listChatsPrivate[this.position].messageList.length == 0) {
                  this.getMessages();
                }
              } else {
                this.position = this.findChatInList(this.listChatsGroup, this.chatObs._id);
                if (this.listChatsGroup[this.position].messageList.length == 0) {
                  this.getMessages();
                }
              }
            }
          }
        }
      }
    }
  }

  //TODO Asks for the messages if necessary of a chat
  getMessages() {
    console.log("Pedí chats")
    this.chatboxService.getMessages(this.listUrls[4], this.chatObs._id, this.page).subscribe(
      messages => {//Igualar o añadir??
        for (let i = 0; i < messages.length; i++) {
          this.formatImage(messages[i]);
        }
        if (this.chatObs.isPrivate) {
          this.listChatsPrivate[this.position].messageList = messages;
        } else {
          this.listChatsGroup[this.position].messageList = messages;
        }
        this.page++;
      }
    );
  }

  //TODO On message received calls add to list of messages
  onMessageSent() {
    if (this.chatObs) {
      this.chatboxService.receiveMessage(this.socket, this.listUrls[5]).subscribe(
        (data: { message: Message, isPrivate: boolean }) => {
          this.addMessageToList(data.message.chatId, data.message, data.isPrivate);
        }
      )
    }
  }

  //TODO On files message sent asks for the file
  onFilesSent() {
    if (this.chatObs) {
      this.chatboxService.receiveFile(this.socket, this.listUrls[6]).subscribe(
        data => {
          this.chatboxService.getFile(this.listUrls[4], data).subscribe(
            file => {
              this.formatImage(file.message);
              this.addMessageToList(file.message.chatId, file.message, file.isPrivate);
            }
          )
        }
      )
    }
  }

  // Sends text message through textArea
  onSubmit() {
    if (this.textArea != "") {
      const newMessage = new Message(this.linkGenerator(this.textArea), this.user.userName, this.chatObs._id, "message", null);
      this.textArea = "";
      if (this.chatObs.isPrivate) {
        this.chatboxService.sendMessagePrivate(this.socket, this.listUrls[1], newMessage);
      } else {
        this.chatboxService.sendMessageGroup(this.socket, this.listUrls[2], newMessage);
      }
    }
  }

  // Generates clickable links from text urls
  linkGenerator(s: String) {
    let x = s.split(" ");
    for (let i = 0; i < x.length; i++) {
      if (x[i].match("(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")) {
        x[i] = "<a href='" + x[i] + "'>" + x[i] + "</a>";
        console.log("url found")
      }
    }
    return x.join(" ");
  }

  // Opens the dialog of files and treats
  openDialog() {
    const dialogRef = this.dialog.open(FileDialogContent);
    dialogRef.componentInstance.filesChange.subscribe(
      data => {
        this.files = data;
        for (let i = 0; i < this.files.length; i++) {
          const formData: FormData = new FormData();
          formData.append('file', this.files[i], this.files[i].name);
          formData.append('userName', this.user.userName as string);
          formData.append('chatId', this.chatObs._id as string);
          this.chatboxService.sendFiles(this.listUrls[0], formData).subscribe(
            e => {
              if (e != null) {
                this.chatboxService.fileSentMessage(this.socket, this.listUrls[3], e.sender, e._id, e.chatId);
              }
            }
          )
        }
      }
    )
  }

  // Differs file types
  recogniseFileType(type: String) {
    if (type == "message") {
      return 0;
    } else if (type == "image/png" || type == "image/jpg" || type == "image/jpeg") {
      return 1;
    } else {
      return 2;
    }
  }

  // Event that opens an image "full screen"
  maximizeImage(image: any) {
    this.dialog.open(ImageDialogContent, {
      data: {image: image},
    });
  }

  // Formats every other object to display it in a new window
  openFile(response: any) {
    const blob = new Blob([new Uint8Array(response.buffer.data)], {type: response.type});
    const exportUrl = URL.createObjectURL(blob);
    window.open(exportUrl);
    URL.revokeObjectURL(exportUrl);
  }

  // Adds an emoji to the textArea
  addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  changeChatContentState() {
    this.chatContent = !this.chatContent;
    this.startAnimation = true;
  }

  //TODO Adds a message to a list (private or group) and pushes to the messages list if it is the main one
  addMessageToList(chatId: String, message: Message, isPrivate: boolean) {
    if (isPrivate) {
      let i = this.findChatInList(this.listChatsPrivate, chatId)
      this.listChatsPrivate[i].messageList.push(message)
    } else {
      let i = this.findChatInList(this.listChatsGroup, chatId)
      this.listChatsGroup[i].messageList.push(message)
    }
  }

  //TODO Finds a chat in a list
  findChatInList(listChats: any[], chatId: String) {
    return listChats.findIndex(x => x.chatId == chatId);
  }

  //TODO Formats images
  formatImage(img: any) {
    if (img.type == "image/jpeg" || img.type == "image/jpg" || img.type == "image/png") {
      const base64String = btoa(new Uint8Array(img.buffer.data).reduce((data, byte) => {
        return data + String.fromCharCode(byte);
      }, ''));
      img.image = this.domSanitizer.bypassSecurityTrustUrl('data:' + img.type + ';base64, ' + base64String);
    } else {
      img.image = null;
    }
  }

}

import {Subject} from "rxjs";

@Component({
  selector: 'cc-customizable-chat-chatbox-file-dialog',
  templateUrl: './file-dialog-content.component.html',
})
export class FileDialogContent {
  files: File[] = [];
  filesChange: Subject<File[]> = new Subject();

  onSelect(event) {
    console.log("On select")
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log("On remove");
    this.files.splice(this.files.indexOf(event), 1);
  }

  sendFiles() {
    this.filesChange.next(this.files);
  }
}

