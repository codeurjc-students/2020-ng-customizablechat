import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableChatChatboxComponent } from './customizable-chat-chatbox.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {Socket} from "ngx-socket-io";

describe('CustomizableChatComponent', () => {
  let component: CustomizableChatChatboxComponent;
  let fixture: ComponentFixture<CustomizableChatChatboxComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableChatChatboxComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizableChatChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
