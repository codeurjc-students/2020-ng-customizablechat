import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {User} from "../models/login";
import {ChatService} from "../services/chat.service";

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {

  user: User;

  constructor(public loginService: LoginService, public chatService: ChatService) { }

  ngOnInit(): void {
    this.loginService.userSubject.subscribe(
      data =>{
        this.user = data;
        console.log(data);
        this.chatService.saveSocket(this.user.userName);
      }
    )
  }

}
