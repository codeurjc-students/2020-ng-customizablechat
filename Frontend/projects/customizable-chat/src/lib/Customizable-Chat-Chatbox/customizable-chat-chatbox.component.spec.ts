import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableChatChatboxComponent } from './customizable-chat-chatbox.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";
import {CustomizableChatChatboxService, FileDialogContent, Message} from "customizable-chat";
import {chatBox, listUrls, user} from "./Mocks/chatboxParameters";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {Socket} from "ngx-socket-io";
import {DomSanitizer} from "@angular/platform-browser";


describe('CustomizableChatComponent', () => {
  let componentChatbox: CustomizableChatChatboxComponent;
  let componentFile: FileDialogContent;
  let fixtureChatbox: ComponentFixture<CustomizableChatChatboxComponent>;
  let fixtureFile: ComponentFixture<FileDialogContent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableChatChatboxComponent, FileDialogContent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers:[CustomizableChatChatboxService, DomSanitizer, MatDialog],
      imports:[
        CommonModule, FormsModule, PickerModule, MatToolbarModule, MatCardModule,
        MatListModule, MatDialogModule, NgxDropzoneModule, MatButtonModule, HttpClientModule
      ]
    })
    .compileComponents();
  });



  beforeEach(() => {
    fixtureChatbox = TestBed.createComponent(CustomizableChatChatboxComponent);
    fixtureFile = TestBed.createComponent(FileDialogContent);

    componentChatbox = fixtureChatbox.componentInstance;
    componentFile = fixtureFile.componentInstance;

    componentChatbox.user = user;
    componentChatbox.chatObs = chatBox;
    componentChatbox.listUrls = listUrls;
    componentChatbox.socket = new Socket({ url: listUrls[4], options:{}})

    componentChatbox.listChatsPrivate = componentChatbox.user.privateChats.map(
      function (x) {
        return ({chatId:x,messageList: [new Message("Test","prueba", "609c3454908b9303cf985f14", "message", null)]});
      }
    );
    componentChatbox.listChatsGroup = componentChatbox.user.groupChats.map(
      function (x) {
        return ({chatId:x,messageList: [new Message("Test","prueba", "609c3454908b9303cf985f14", "message", null)]});
      }
    );

    componentChatbox.ngOnInit();

    fixtureChatbox.detectChanges();
    fixtureFile.detectChanges();
  });

  it('should create', () => {
    expect(componentChatbox).toBeTruthy();
  });
});
