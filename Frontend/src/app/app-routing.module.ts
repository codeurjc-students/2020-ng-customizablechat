import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrameComponent} from "./frame/frame.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '',  redirectTo:'login', pathMatch:'full'},
  { path: 'app', component: FrameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
