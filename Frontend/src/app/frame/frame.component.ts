import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {SendChangeProfile, User} from "../models/login";
import {ChatService} from "../services/chat.service";

import {AddContactPrivate, Chat} from "../models/chat";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MainChatSharedService} from "../services/main-chat-shared.service";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {

  user: User;
  imageToDisplay:any;
  sendImage:File;

  modalIsActive: boolean;
  modalGroupIsActive: boolean;
  modalProfile: boolean;

  formAddPrivateChat: FormGroup;
  formCreateGroupChat: FormGroup;
  formChangeProfile: FormGroup;
  groupParticipantsArray: String[] = [];
  chatCreated: boolean = null;
  modalFeedbackActive: boolean = false;

  constructor(public loginService: LoginService, public chatService: ChatService, private fb: FormBuilder, public mainChat: MainChatSharedService, public usersService: UsersService) {
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
    this.formChangeProfile = new FormGroup({
      image: new FormControl(),
      description: new FormControl(),
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

  onChangeProfile(value: boolean){
    this.modalProfile = value;
  }

  addPrivateChat() {
    if (this.formAddPrivateChat.valid) {
      let newChat = new AddContactPrivate(this.user.userName, this.formAddPrivateChat.get('participant').value, true);
      this.chatService.addPrivateChat(newChat).subscribe(
        data => {
          this.chatCreated = data;
          if (this.chatCreated != null) {
            this.onActivateModal(false);
            this.changeModalFeedbackActive();
            this.mainChat.setNewChat(data);
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
      this.chatService.createGroupChat(newChat).subscribe(
        data => {
          this.chatCreated = data;
          if (this.chatCreated != null) {
            this.onActivateGroupModal(false);
            this.changeModalFeedbackActive();
            this.mainChat.setNewChat(data);
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

  changeUserProfile(){
    if(this.imageToDisplay!= null || this.formChangeProfile.get('description').value != null) {
      const body: FormData = new FormData();
      body.append('username', this.user.userName as string)
      body.append('description', this.formChangeProfile.get('description').value as string)
      body.append('image', this.sendImage, this.sendImage.name)
      this.usersService.changeProfile(body).subscribe(
        data => {
          console.log(data);
          if (data) {
            this.changeUserProfile();
            this.changeModalFeedbackActive();
          }
        }
      )
    }
  }


  onImageSelected(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this.sendImage = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageToDisplay = event.target.result;
      }
    }
  }
}
