import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../models/login";
import {ChatService} from "../services/chat.service";
import {Message} from "../models/message";
import {AddContactPrivate} from "../models/chat";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainChatSharedService} from "../services/main-chat-shared.service";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  user: User;

  modalIsActive: boolean;

  formAddPrivateChat:FormGroup;
  chatCreated: boolean = null;
  modalFeedbackActive: boolean = false;

  constructor(public loginService: LoginService, public chatService: ChatService, private fb: FormBuilder, public mainChat:MainChatSharedService) { }

  ngOnInit(): void {
    this.modalIsActive =false;
    this.formAddPrivateChat = this.fb.group({
      participant: ['', Validators.required],
    });
    this.loginService.userSubject.subscribe(
      data =>{
        this.user = data;
        this.chatService.saveSocket(data.userName);
      }
    )
  }

  onActivateModal(value: boolean){
    this.modalIsActive = value;
  }

  addPrivateChat(){
    if(this.formAddPrivateChat.valid) {
      let newChat = new AddContactPrivate(this.user.userName, this.formAddPrivateChat.get('participant').value, true);
      this.chatService.addPrivateChat(newChat).subscribe(
        data =>{
          this.chatCreated = data;
          if(this.chatCreated == true ){
            this.onActivateModal(false);
            this.changeModalFeedbackActive();
          }
        }
      );
    }
  }

  changeModalFeedbackActive(){
    this.modalFeedbackActive = !this.modalFeedbackActive;
  }

}
