import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SendChangeColor} from "../models/login";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private Api_url = environment.API_URL;

  constructor(private http: HttpClient) { }

  changeColorMode(body:SendChangeColor){
    return this.http.put(this.Api_url + 'users/color-modes', body)
  }

  changeProfile(body:any ){
    return this.http.put(this.Api_url + 'files/profiles', body);
  }


}
