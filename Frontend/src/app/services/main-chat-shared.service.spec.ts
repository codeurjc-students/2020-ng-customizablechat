import { TestBed } from '@angular/core/testing';

import { MainChatSharedService } from './main-chat-shared.service';

describe('MainChatSharedService', () => {
  let service: MainChatSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainChatSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
