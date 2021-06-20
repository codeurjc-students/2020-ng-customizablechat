import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

// @dynamic
@Component({
  selector: 'cc-customizable-chat-chatbox-image-dialog',
  templateUrl: './image-dialog-content.component.html',
  styleUrls: ['../assets/customizable-chat-chatbox.scss']
})
export class ImageDialogContent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {image:any}) { }

  ngOnInit(): void {
  }


}
