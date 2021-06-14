import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableChatChatListComponent } from './customizable-chat-chat-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CustomizableChatChatListComponent', () => {
  let component: CustomizableChatChatListComponent;
  let fixture: ComponentFixture<CustomizableChatChatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableChatChatListComponent ],
      schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizableChatChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
