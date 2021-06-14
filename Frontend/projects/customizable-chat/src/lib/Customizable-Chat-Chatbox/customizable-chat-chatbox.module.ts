import { NgModule } from '@angular/core';
import {CustomizableChatChatboxComponent} from './customizable-chat-chatbox.component';
import {CommonModule} from "@angular/common";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxDropzoneModule} from "ngx-dropzone";
import { FileDialogContent } from './customizable-chat-chatbox.component';
import {ImageDialogContent} from "./image-dialog-content/image-dialog-content.component";
import {CustomizableChatChatboxService} from "./customizable-chat-chatbox.service";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    CustomizableChatChatboxComponent,
    FileDialogContent,
    ImageDialogContent
  ],
  imports: [
    CommonModule,
    PickerModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    NgxDropzoneModule,
    MatButtonModule
  ],
  exports: [
    CustomizableChatChatboxComponent,
    ImageDialogContent,
    FileDialogContent
  ],
  providers:[
    CustomizableChatChatboxService
  ]
})
export class CustomizableChatChatboxModule { }
