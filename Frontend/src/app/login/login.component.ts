import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";
import {Login} from "../models/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public loginInvalid: boolean;
  public hidePass : boolean = true;
  public value: any = false;

  constructor(
    private fb: FormBuilder,
    public loginService : LoginService,
    private router: Router,
  ) {
  }

  async ngOnInit() {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  async onSubmit() {
    this.loginInvalid = false;
    if (this.form.valid) {
      try {
        let newUser = new Login(this.form.get('username').value, this.form.get('password').value);
        this.loginService.login(newUser).subscribe(
          data=>{
            this.value = data;
            console.log(this.value);
            if(this.value == true){
              this.router.navigate(['home']);
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

}
