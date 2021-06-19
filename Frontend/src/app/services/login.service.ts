import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login, User} from "../models/login";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Api_url = environment.API_URL;
  public user: User;
  public userSubject : BehaviorSubject<User>;


  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject(this.user);
  }

  login(user: Login){
    return this.http.put<any>(this.Api_url+ 'sign/in', user);
  }

  logout(user: Login){
    return this.http.put<any>(this.Api_url+ 'sign/out', user);
  }

  signUp(user: User) {
    return this.http.post(this.Api_url + 'sign/up', user);
  }

  setUser(user : User){
    this.userSubject.next(user);
  }

}
