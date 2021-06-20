import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {CreateUser, Login, User} from "../models/login";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formSignUp: FormGroup
  public loginInvalid: boolean;
  public hidePass : boolean = true;
  public value: any = false;
  public login: boolean = true;
  public passwordError : boolean = false;
  public signUpError : boolean;
  public missingCreateData : boolean;

  constructor(
    private fb: FormBuilder,
    public loginService : LoginService,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) {
  }

  async ngOnInit() {

    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.formSignUp = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      verifyPassword: ['', Validators.required],
    });

  }

  async onLogin() {
    this.loginInvalid = false;
    if (this.formLogin.valid) {
      try {
        let newUser = new Login(this.formLogin.get('username').value, this.formLogin.get('password').value);
        this.loginService.login(newUser).subscribe(
          data=>{
            if(data != null){
              this.loginService.setUser(this.transformUser(data as any));
              this.router.navigate(['app']);
            }else{
              this.passwordError = !this.passwordError;
            }
          },error => {
            console.log(error);
          }
        );

      } catch (err) {
        this.loginInvalid = true;
      }
    }
  }

  async onSignUp() {
    if (this.validateSignUp()) {
      try {
        console.info(this.formSignUp.get(['username']).value, this.formSignUp.get(['name']).value, this.formSignUp.get(['password']).value)
        let newUser = new CreateUser(this.formSignUp.get(['username']).value, this.formSignUp.get(['name']).value, this.formSignUp.get(['password']).value);
        this.loginService.signUp(newUser).subscribe(
          data=>{
            if(data != null){
              this.loginService.setUser(this.transformUser(data as any));
              this.router.navigate(['app']);
            }else{
              this.signUpError = true;
            }
          },error => {
            console.log(error);
          }
        );

      } catch (err) {
      }
    }else{
      this.missingCreateData = true;
    }
  }

  changeForms(){
    this.login = !this.login;
  }

  validateSignUp(){
    return this.formSignUp.valid && this.formSignUp.get(['password']).value === this.formSignUp.get(['verifyPassword']).value;
  }

  transformUser(user: any){
    var image;
    console.log(user);
    if(user.imageType != "noType") {
      const TYPED_ARRAY = new Uint8Array(user.image.data);
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      let base64String = btoa(STRING_CHAR);
      image = this.domSanitizer.bypassSecurityTrustUrl('data:' + user.imageType + ';base64, ' + base64String);
    }else{
      image = null;
    }
    return new User(user.userName, user.name, user.socketId, user.active, user.idSettings,user.password, user.privateChats, user.groupChats, image, user.description);
  }

}
