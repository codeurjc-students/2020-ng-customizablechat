import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrameComponent } from './frame/frame.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { OptionsSideBarComponent } from './frame/options-side-bar/options-side-bar.component';
import { ChatsComponent } from './frame/chats/chats.component';
import {ChatboxComponent, DialogContent} from './frame/chatbox/chatbox.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from "@angular/material/menu";
import {NgxDropzoneModule} from "ngx-dropzone";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SocketIoModule, SocketIoConfig} from "ngx-socket-io";
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {LoginService} from "./services/login.service";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";
import { ImageDialogComponent } from './frame/chatbox/image-dialog/image-dialog.component';
import {PickerModule} from "@ctrl/ngx-emoji-mart";

const config: SocketIoConfig = { url: environment.API_URL, options:{}};

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    OptionsSideBarComponent,
    ChatsComponent,
    ChatboxComponent,
    DialogContent,
    LoginComponent,
    ImageDialogComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatBadgeModule,
        MatTabsModule,
        MatToolbarModule,
        MatMenuModule,
        NgxDropzoneModule,
        MatDialogModule,
        FormsModule,
        SocketIoModule.forRoot(config),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        PickerModule
    ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
