import {TestBed} from '@angular/core/testing';
import { CustomizableChatChatboxService } from './customizable-chat-chatbox.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {formSendFile} from "./Mocks/sendFileMock";
import {Socket} from "ngx-socket-io";
import {Message} from "customizable-chat";

describe('CustomizableChatService', () => {
  let service: CustomizableChatChatboxService;
  let httpMock: HttpTestingController;
  let socket: Socket;
  let socketWorks :boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CustomizableChatChatboxService],imports: [ HttpClientTestingModule ] });
    service = TestBed.inject(CustomizableChatChatboxService);
    httpMock = TestBed.inject(HttpTestingController);
    socket = new Socket({ url: 'http://localhost:3000/', options:{}})
    socket.connect();
    socketWorks = false;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a file ',()=>{
    let url = 'http://localhost:3000/files';
    service.sendFiles(url,formSendFile ).subscribe(
      response=>{
        expect(response).toBeDefined();
      }
    );

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe("POST");
    req.flush(formSendFile);
  });

  it('should Send Private Message through Socket', ()=>{
    let m = new Message("Test","Diego_pf7", "60747a42c99c1902fe482867", "message", null)
    spyOn(socket, "emit").and.callFake(function(){ socketWorks = true});
      service.sendMessagePrivate(socket,'sendMessagePrivate', m);
    expect(socketWorks).toBeTrue();
  });

  it('should Send Group Message through Socket', ()=>{
    let m = new Message("Test","Diego_pf7", "60ac27413e22a80537e47079", "message", null);
    spyOn(socket, "emit").and.callFake(function(){ socketWorks = true});
    service.sendMessageGroup(socket,'sendMessageGroup', m);
    expect(socketWorks).toBeTrue();
  });

  it('should Send File Message through Socket', ()=>{
    spyOn(socket, "emit").and.callFake(function(){ socketWorks = true});
    service.fileSentMessage(socket,'fileSentMessage','Diego_pf7','60c7a37a17c5793c985f857a', '60747a42c99c1902fe482867');
    expect(socketWorks).toBeTrue();
  });

  it('should get Messages',()=>{
    let url = 'http://localhost:3000/';
    service.getMessages(url,"609d74490e76e501fe0e4562",0 ).subscribe(
      response=>{
        expect(response).toBeDefined();
      }
    );
    let finalUrl = url + 'chats/609d74490e76e501fe0e4562/0';
    const req = httpMock.expectOne(finalUrl);
    expect(req.request.method).toBe("GET");
    req.flush(url);
  });

  it('should get File ',()=>{
    let url = 'http://localhost:3000/';
    service.getFile(url,"60c7a37a17c5793c985f857a").subscribe(
      response=>{
        expect(response).toBeDefined();
      }
    );
    let finalUrl = url + 'files/60c7a37a17c5793c985f857a';
    const req = httpMock.expectOne(finalUrl);
    expect(req.request.method).toBe("GET");
    req.flush(url);
  });


  afterEach(function (){
    socket.disconnect();
  });
});
