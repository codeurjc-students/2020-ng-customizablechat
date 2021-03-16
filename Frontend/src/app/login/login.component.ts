import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {CreateUser, Login, User} from "../models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
            this.value = data;
            console.log(this.value);
            if(this.value == true){
              this.router.navigate(['home']);
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
            this.value = data;
            console.log(data);
            if(this.value != null){
              this.router.navigate(['home']);
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

}
