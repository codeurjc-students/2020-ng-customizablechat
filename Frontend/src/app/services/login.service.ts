import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login, User} from "../models/login";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Api_url = environment.API_URL;

  constructor(private http: HttpClient) { }

  login(user: Login){
    return this.http.post<any>(this.Api_url+ 'sign/in', user);
  }

  signUp(user: User) {
    return this.http.post(this.Api_url + 'sign/up', user);
  }

}
