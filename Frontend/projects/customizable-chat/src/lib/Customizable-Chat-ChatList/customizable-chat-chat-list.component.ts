import {Component, Input} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'cc-customizable-chat-chat-list',
  templateUrl: './customizable-chat-chat-list.component.html',
  styleUrls: ['./assets/customizable-chat-chat-list.scss']
})
export class CustomizableChatChatListComponent {

  @Input() user : any;

  @Input() privateChats:any[] = [];
  @Input() groupChats:any[] = [];

  @Input() chatChange: Subject<any> = new Subject<any>();

  changeMainChat(value:any){
    this.chatChange.next(value);
  }

}
