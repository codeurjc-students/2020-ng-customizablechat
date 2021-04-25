import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../models/login";
import {ChatService} from "../services/chat.service";

import {AddContactPrivate, Chat} from "../models/chat";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MainChatSharedService} from "../services/main-chat-shared.service";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  user: User;

  modalIsActive: boolean;
  modalGroupIsActive: boolean;

  formAddPrivateChat: FormGroup;
  formCreateGroupChat: FormGroup;
  groupParticipantsArray: String[] = [];
  chatCreated: boolean = null;
  modalFeedbackActive: boolean = false;

  constructor(public loginService: LoginService, public chatService: ChatService, private fb: FormBuilder, public mainChat: MainChatSharedService) {
  }

  ngOnInit(): void {
    this.modalIsActive = false;
    this.formAddPrivateChat = this.fb.group({
      participant: ['', Validators.required],
    });
    this.formCreateGroupChat = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      participant: new FormControl(),
    });
    this.loginService.userSubject.subscribe(
      data => {
        this.user = data;
        this.chatService.saveSocket(data.userName);
      }
    )
  }

  onActivateModal(value: boolean) {
    this.modalIsActive = value;
  }

  onActivateGroupModal(value: boolean) {
    this.modalGroupIsActive = value;
  }

  onChangeColor(value: boolean) {
    this.user.idSettings = value ? 2 : 1;
  }

  addPrivateChat() {
    if (this.formAddPrivateChat.valid) {
      let newChat = new AddContactPrivate(this.user.userName, this.formAddPrivateChat.get('participant').value, true);
      this.chatService.addPrivateChat(newChat).subscribe(
        data => {
          this.chatCreated = data;
          if (this.chatCreated == true) {
            this.onActivateModal(false);
            this.changeModalFeedbackActive();
          }
        }
      );
    }
  }

  createGroupChat() {
    if(this.groupParticipantsArray!= [] && this.formCreateGroupChat.get('name').value ) {
      this.groupParticipantsArray.push(this.user.userName);
      let newChat = new Chat(this.formCreateGroupChat.get('name').value, this.formCreateGroupChat.get('description').value, new Date(), this.groupParticipantsArray, false);
      this.groupParticipantsArray = [];
      console.log(newChat);
      this.chatService.createGroupChat(newChat).subscribe(
        data => {
          this.chatCreated = data;
          if (this.chatCreated == true) {
            this.onActivateGroupModal(false);
            this.changeModalFeedbackActive();
          }
        }
      );
    }
  }

  changeModalFeedbackActive() {
    this.modalFeedbackActive = !this.modalFeedbackActive;
  }

  addParticipantToGroup() {
    if (this.formCreateGroupChat.get('participant').value != "") {
      this.groupParticipantsArray.push(this.formCreateGroupChat.get('participant').value);
      this.formCreateGroupChat.setValue({
        name: this.formCreateGroupChat.get('name').value,
        description: this.formCreateGroupChat.get('description').value,
        participant: ""
      })
    }


  }

}
