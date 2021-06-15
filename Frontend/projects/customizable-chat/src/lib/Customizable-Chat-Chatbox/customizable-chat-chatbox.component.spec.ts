import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableChatChatboxComponent } from './customizable-chat-chatbox.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {CustomizableChatChatboxService, FileDialogContent} from "customizable-chat";
import {user} from "./Mocks/chatboxParameters";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PickerModule} from "@ctrl/ngx-emoji-mart";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";

describe('CustomizableChatComponent', () => {
  let componentChatbox: CustomizableChatChatboxComponent;
  let componentFile: FileDialogContent;
  let fixtureChatbox: ComponentFixture<CustomizableChatChatboxComponent>;
  let fixtureFile: ComponentFixture<FileDialogContent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableChatChatboxComponent, FileDialogContent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      providers:[CustomizableChatChatboxService],
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

    fixtureChatbox.detectChanges();
    fixtureFile.detectChanges();
  });

  it('should create', () => {
    expect(componentChatbox).toBeTruthy();
  });
});
