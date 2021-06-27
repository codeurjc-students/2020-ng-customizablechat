import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableChatChatListComponent } from './customizable-chat-chat-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {CommonModule} from "@angular/common";
import {MatBadgeModule} from "@angular/material/badge";
import {chatBox, user} from "../Customizable-Chat-Chatbox/Mocks/chatboxParameters";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('CustomizableChatChatListComponent', () => {
  let component: CustomizableChatChatListComponent;
  let fixture: ComponentFixture<CustomizableChatChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableChatChatListComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports:[
        MatIconModule, MatDividerModule, MatListModule,
        MatTabsModule, CommonModule, MatBadgeModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizableChatChatListComponent);
    component = fixture.componentInstance;
    component.user = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should changeMainChat', () => {

    component.chatChange.subscribe(
      data=>{
        expect(data).toBeDefined();
      }
    );
    component.changeMainChat(chatBox);
  });
});
