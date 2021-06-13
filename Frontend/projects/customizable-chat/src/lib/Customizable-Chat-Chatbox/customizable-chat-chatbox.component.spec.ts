import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizableChatChatboxComponent } from './customizable-chat-chatbox.component';

describe('CustomizableChatComponent', () => {
  let component: CustomizableChatChatboxComponent;
  let fixture: ComponentFixture<CustomizableChatChatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizableChatChatboxComponent ]
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
