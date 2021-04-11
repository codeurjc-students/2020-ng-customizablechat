import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../models/login";
import {ChatService} from "../services/chat.service";
import {Message} from "../models/message";
import {AddContactPrivate} from "../models/chat";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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

  constructor(public loginService: LoginService, public chatService: ChatService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.modalIsActive =false;
    this.formAddPrivateChat = this.fb.group({
      participant: ['', Validators.required],
    });
    this.loginService.userSubject.subscribe(
      data =>{
        this.user = data;
        console.log(data);
        this.chatService.saveSocket(this.user.userName);
      }
    )
  }

  onActivateModal(value: boolean){
    this.modalIsActive = value;
  }

  addPrivateChat(){
    if(this.formAddPrivateChat.valid) {
      let newChat = new AddContactPrivate(this.user.userName, this.formAddPrivateChat.get('participant').value);
      console.log(JSON.stringify(newChat));
      this.chatService.addPrivateChat(newChat).subscribe(
        data =>{
          this.chatCreated = data;
          console.log(data)
          if(this.chatCreated == true ){
            this.onActivateModal(false);
            this.changeModalFeedbackActive();
            //this.chatService.sendMessage(new Message("Patata", "izquierdo_ana", "606f50b2be955e042975ee98"));
          }
        }
      );
    }
  }

  changeModalFeedbackActive(){
    this.modalFeedbackActive = !this.modalFeedbackActive;
  }

}
