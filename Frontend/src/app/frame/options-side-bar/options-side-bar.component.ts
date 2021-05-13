import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Login, SendChangeColor, User} from "../../models/login";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-options-side-bar',
  templateUrl: './options-side-bar.component.html',
  styleUrls: ['./options-side-bar.component.scss']
})
export class OptionsSideBarComponent implements OnInit {

  @Input() user: User;

  @Output() modalActive  = new EventEmitter<boolean>();
  @Output() colorActive  = new EventEmitter<boolean>();
  @Output() modalGroupActive  = new EventEmitter<boolean>();

  constructor(public usersService:UsersService, public loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  changeModal(value:boolean){
    this.modalActive.emit(value);
  }

  changeColor(value:boolean){
    this.usersService.changeColorMode(new SendChangeColor(this.user.userName,(value? 2:1))).subscribe(
      data=>{
        this.colorActive.emit(value);
      }
    );
  }

  setModalCreateGroup(value:boolean){
    this.modalGroupActive.emit(value);
  }

  logout(){
    this.loginService.logout(new Login(this.user.userName as string,this.user.password as string)).subscribe(
      data =>{
        this.router.navigate(['login']);
      }
    )
  }
}
