import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrameComponent} from "./frame/frame.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch:"full" },
  { path: 'home', component: FrameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
