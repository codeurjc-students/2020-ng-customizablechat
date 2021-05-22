import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MainChatSharedService} from "../../services/main-chat-shared.service";
import {User} from "../../models/login";
import {Message} from "../../models/message";
import {ChatService} from "../../services/chat.service";
import {Subject} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageDialogComponent} from "./image-dialog/image-dialog.component";
import {ChatMessages} from "../../models/chat";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  @Input() user: User;
  chatObs: any = null;
  page: number = 0;

  listChatsMessagesPrivate: ChatMessages[];
  listChatsMessagesGroup: ChatMessages[];

  files: File[] = [];

  public textArea = "";
  public isEmojiPickerVisible: boolean;

  position: number;
  chatContent: boolean = false;
  startAnimation: boolean = false;

  constructor(public dialog: MatDialog, public mainChat: MainChatSharedService, public chatService: ChatService, private fb: FormBuilder, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.onSetChats();
    this.onChatChange();
    this.onMessageSent();
    this.onFilesSent();
    this.onNewChat();
  }

  onSetChats(){
    this.listChatsMessagesPrivate = this.user.privateChats.map(
      function(x){
        return (new ChatMessages(x,[]));
      }
    );
    this.listChatsMessagesGroup = this.user.groupChats.map(
      function(x){
        return (new ChatMessages(x,[]));
      }
    );

  }

  // Treats the change of the main chat
  onChatChange() {
    this.mainChat.chatChange.subscribe(
      data => {
        this.chatObs = data;
        this.page = 0;
        if (this.chatObs.isPrivate) {
          let pos = this.findChatInList(this.listChatsMessagesPrivate, this.chatObs._id)
          this.position = pos;
          if (this.listChatsMessagesPrivate[pos].messageList.length == 0) {
            this.getMessages();
          }
        } else {
          let pos = this.findChatInList(this.listChatsMessagesGroup, this.chatObs._id);
          this.position = pos;
          if (this.listChatsMessagesGroup[pos].messageList.length == 0) {
            this.getMessages();
          }
        }
      }
    );
  }

  onNewChat() {
    this.mainChat.addChatChange.subscribe(
      chat => {
        this.chatObs = chat;
        if (chat.isPrivate) {
            this.listChatsMessagesPrivate.unshift(new ChatMessages(chat._id, []));
        } else {
            this.listChatsMessagesGroup.unshift(new ChatMessages(chat._id, []));
        }
        this.position = 0;
      }
    )
  }

  // Asks for the messages if necessary of a chat
  getMessages() {
    console.log("Pedí chats")
    this.mainChat.getMessages(this.chatObs._id, this.page).subscribe(
      messages => {//Igualar o añadir??
        if (this.chatObs.isPrivate) {
          this.listChatsMessagesPrivate[this.position].messageList = messages;
        } else {
          this.listChatsMessagesGroup[this.position].messageList = messages;
        }
        this.page++;
      }
    );
  }

  // Sends text message through textArea
  onSubmit() {
    if (this.textArea != "") {
      const newMessage = new Message(this.linkGenerator(this.textArea), this.user.userName, this.chatObs._id, "message", null);
      this.textArea = "";
      if (this.chatObs.isPrivate) {
        this.chatService.sendMessagePrivate(newMessage);
      } else {
        this.chatService.sendMessageGroup(newMessage);
      }
    }
  }

  // On message received calls add to list of messages
  onMessageSent() {
    this.chatService.receiveMessage().subscribe(
      (data: {message: Message, isPrivate:boolean})=> {
        this.addMessageToList(data.message.chatId, data.message, data.isPrivate);
      }
    )
  }

  // Adds a message to a list (private or group) and pushes to the messages list if it is the main one
  addMessageToList(chatId: String, message: Message, isPrivate: boolean) {
    if (isPrivate) {
      let i = this.findChatInList(this.listChatsMessagesPrivate, chatId)
        this.listChatsMessagesPrivate[i].messageList.push(message)
    } else {
      let i = this.findChatInList(this.listChatsMessagesGroup, chatId)
        this.listChatsMessagesGroup[i].messageList.push(message)
    }
  }

  // Opens the dialog of files and treats
  openDialog() {
    const dialogRef = this.dialog.open(DialogContent);
    dialogRef.componentInstance.filesChange.subscribe(
      data => {
        this.files = data;
        for (let i = 0; i < this.files.length; i++) {
          const formData: FormData = new FormData();
          formData.append('file', this.files[i], this.files[i].name);
          formData.append('userName', this.user.userName as string);
          formData.append('chatId', this.chatObs._id as string);
          this.chatService.sendFiles(formData).subscribe(
            e => {
              if (e != null) {
                this.chatService.fileSentMessage(e.sender, e._id, e.chatId);
                this.addMessageToList(e.chatId, e, this.chatObs.isPrivate);
              }
            }
          )
        }
      }
    )
  }

  // On files message sent asks for the file
  onFilesSent() {
    this.chatService.receiveFile().subscribe(
      data => {
        this.chatService.getFile(data).subscribe(
          file => {
            this.addMessageToList(file.message.chatId, file.message, file.isPrivate);
          }
        )
      }
    )
  }

  // Generates clickable links from text urls
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

  // Formats byte array images to display them
  formatImage(img: any): any {
    // Converts arraybuffer to typed array object
    const TYPED_ARRAY = new Uint8Array(img.buffer.data);
    // converts the typed array to string of characters
    const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
    //converts string of characters to base64String
    let base64String = btoa(STRING_CHAR);
    //sanitize the url that is passed as a value to image src attrtibute
    return this.domSanitizer.bypassSecurityTrustUrl('data:' + img.type + ';base64, ' + base64String);
  }

  // Event that opens an image "full screen"
  maximizeImage(image: any) {
    const dialogRef = this.dialog.open(ImageDialogComponent, {
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

  // Finds a chat in a list
  findChatInList(listChats: ChatMessages[], chatId: String) {
    return listChats.findIndex(x => x.chatId == chatId);
  }

  changeChatContentState(){
    this.chatContent = !this.chatContent;
    this.startAnimation = true;
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'fileDialog.html',
})
export class DialogContent {
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
