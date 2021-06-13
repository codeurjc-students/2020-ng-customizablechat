import { NgModule } from '@angular/core';
import { CustomizableChatChatListComponent } from './customizable-chat-chat-list.component';
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {CommonModule} from "@angular/common";
import {MatBadgeModule} from "@angular/material/badge";



@NgModule({
  declarations: [
    CustomizableChatChatListComponent
  ],
  imports: [
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    CommonModule,
    MatBadgeModule
  ],
  exports: [
    CustomizableChatChatListComponent,
  ],
  providers:[
  ]
})
export class CustomizableChatChatListModule { }
