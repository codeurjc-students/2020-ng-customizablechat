import { TestBed} from '@angular/core/testing';

import { CustomizableChatChatboxService } from './customizable-chat-chatbox.service';
import {HttpTestingController} from "@angular/common/http/testing";

describe('CustomizableChatService', () => {
  let injector: TestBed;
  let service: CustomizableChatChatboxService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizableChatChatboxService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('')
});
