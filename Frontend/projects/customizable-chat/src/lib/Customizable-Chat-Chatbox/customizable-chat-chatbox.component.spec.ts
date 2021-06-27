import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableChatChatboxComponent } from './customizable-chat-chatbox.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, SimpleChange} from "@angular/core";
import {CustomizableChatChatboxService, FileDialogContent, Message} from "customizable-chat";
import {
  chatBox, chatBoxChange,
  listUrls,
  messageImage,
  normalMessageGroup,
  normalMessagePrivate,
  user
} from "./Mocks/chatboxParameters";
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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


describe('CustomizableChatComponent', () => {
  let componentChatbox: CustomizableChatChatboxComponent;
  let componentFile: FileDialogContent;
  let fixtureChatbox: ComponentFixture<CustomizableChatChatboxComponent>;
  let fixtureFile: ComponentFixture<FileDialogContent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableChatChatboxComponent, FileDialogContent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers:[
        CustomizableChatChatboxService,
        MatDialog,
        {provide: DomSanitizer, useValue: {bypassSecurityTrustUrl: () => 'safeString'}},
      ],
      imports:[
        CommonModule, FormsModule, PickerModule, MatToolbarModule, MatCardModule,
        MatListModule, MatDialogModule, NgxDropzoneModule, MatButtonModule, HttpClientModule,
        BrowserAnimationsModule
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
    componentChatbox.page = 0;
    componentChatbox.position = 0;
    componentChatbox.chatContent = false;
    componentChatbox.startAnimation = false;

    componentChatbox.listChatsPrivate = user.privateChats.map(
      function (x) {
        return ({chatId:x,messageList: [new Message("Test","prueba", x, "message", null)]});
      }
    );
    componentChatbox.listChatsGroup = user.groupChats.map(
      function (x) {
        return ({chatId:x,messageList: [new Message("Test","prueba", x, "message", null)]});
      }
    );
    componentChatbox.ngOnInit();

    fixtureChatbox.detectChanges();
    fixtureFile.detectChanges();
  });

  it('should create', () => {
    expect(componentChatbox).toBeTruthy();
  });

  it('should maximize image',()=>{
    let data = messageImage;
    componentChatbox.formatImage(data);
    componentChatbox.maximizeImage(data['image'])
    expect(data['image']).toBeDefined();
  });


  it('should do ngOnChanges', ()=>{
    let before = componentChatbox.chatObs;
    componentChatbox.chatObs = chatBoxChange;
    let after = componentChatbox.chatObs;
    componentChatbox.ngOnChanges({
      chatObs: new SimpleChange(before, after,false)
    })
    fixtureChatbox.detectChanges();
    expect(fixtureChatbox.nativeElement.querySelector('#testChangesGroup')).toBe(chatBoxChange.name);
  });

  it('should submit a message', ()=>{
    componentChatbox.textArea = "Esto es un test con link incluido http://google.es"
    componentChatbox.onSubmit();
    expect(componentChatbox.textArea).toEqual("");
  });

  it('should recognise file type image',()=>{
    let value = componentChatbox.recogniseFileType("image/png")
    expect(value).toEqual(1);
  });

  it('should recognise file type other type (docx)',()=>{
    let value = componentChatbox.recogniseFileType("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    expect(value).toEqual(2);
  });




  it('should change chat content state', ()=>{
    spyOn(componentChatbox, 'changeChatContentState')
    componentChatbox.changeChatContentState();
    expect(componentChatbox.changeChatContentState).toHaveBeenCalled();
  });

  it('should add a message to group list',()=>{
    let valueBefore = componentChatbox.listChatsGroup[0].messageList.length;
    componentChatbox.addMessageToList(normalMessageGroup.chatId,normalMessageGroup,false);
    let valueAfter = componentChatbox.listChatsGroup[0].messageList.length;
    expect(valueBefore+1).toEqual(valueAfter);
  });

  it('should add a message to private list',()=>{
    let valueBefore = componentChatbox.listChatsPrivate[0].messageList.length;
    componentChatbox.addMessageToList(normalMessagePrivate.chatId,normalMessagePrivate,true);
    let valueAfter = componentChatbox.listChatsPrivate[0].messageList.length;
    expect(valueBefore+1).toEqual(valueAfter);
  });

  it('should find the position of a chat in a list',()=>{
    let value = componentChatbox.findChatInList(componentChatbox.listChatsPrivate, user.privateChats[0]);
    expect(value).toEqual(0);
  });

  it('should find the position of a chat in a list',()=>{
    let value = componentChatbox.findChatInList(componentChatbox.listChatsPrivate, '509785934025345');
    expect(value).toEqual(-1);
  });

  it('should format Image', ()=>{
    let data = messageImage;
    componentChatbox.formatImage(data);
    expect(data['image']).toBeDefined();
  });

  it('should not format Image', ()=>{
    componentChatbox.formatImage(componentChatbox.listChatsPrivate[0].messageList[0]);
    expect(componentChatbox.listChatsPrivate[0].messageList[0].image).toBeNull();
  });
});
