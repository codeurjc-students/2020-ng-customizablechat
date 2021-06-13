import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {MainChatSharedService} from "../../services/main-chat-shared.service";
import {User} from "../../models/login";
import {Message} from "../../models/message";
import {ChatService} from "../../services/chat.service";
import {DomSanitizer} from "@angular/platform-browser";
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

  position: number;

  constructor(public dialog: MatDialog, public mainChat: MainChatSharedService, public chatService: ChatService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.onSetChats();
    this.onChatChange();
    this.onMessageSent();
    this.onFilesSent();
    this.onNewChat();
  }

  onSetChats() {
    this.listChatsMessagesPrivate = this.user.privateChats.map(
      function (x) {
        return (new ChatMessages(x, []));
      }
    );
    this.listChatsMessagesGroup = this.user.groupChats.map(
      function (x) {
        return (new ChatMessages(x, []));
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

  // On message received calls add to list of messages
  onMessageSent() {
    this.chatService.receiveMessage().subscribe(
      (data: { message: Message, isPrivate: boolean }) => {
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

  // Finds a chat in a list
  findChatInList(listChats: ChatMessages[], chatId: String) {
    return listChats.findIndex(x => x.chatId == chatId);
  }
}
