import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  messageData = new FormGroup ({
    message: new FormControl()
  });

  message: string = this.messageData.controls['message'].value;

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }


  openDialog(){
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onSubmit(){
    this.message = this.messageData.controls['message'].value;
  }

}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'fileDialog.html',
})
export class DialogContent {
  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
