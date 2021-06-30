import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {MainChatSharedService} from "../../services/main-chat-shared.service";
import {User} from "../../models/login";
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
}
