import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {Socket} from "ngx-socket-io";
import {CustomizableChatChatboxService} from "./customizable-chat-chatbox.service";
import {ImageDialogContent} from "./image-dialog-content/image-dialog-content.component";
import {Message} from "./Models/message";

@Component({
  selector: 'cc-customizable-chat-chatbox',
  templateUrl: './customizable-chat-chatbox.html',
  styleUrls: ['./assets/customizable-chat-chatbox.scss']
})
export class CustomizableChatChatboxComponent {

  @Input() user: any;
  @Input() chatObs: any;
  @Input() messageList: any[];
  @Input() socket:Socket;
  @Input() listUrls:string[];

  files: File[] = [];

  public textArea = "";
  public isEmojiPickerVisible: boolean;

  chatContent: boolean = false;
  startAnimation: boolean = false;

  constructor(public dialog: MatDialog, private domSanitizer: DomSanitizer, private chatboxService:CustomizableChatChatboxService) {
  }

  // Sends text message through textArea
  onSubmit() {
    if (this.textArea != "") {
      const newMessage = new Message(this.linkGenerator(this.textArea), this.user.userName, this.chatObs._id, "message", null);
      console.table(newMessage);
      this.textArea = "";
      if (this.chatObs.isPrivate) {
        this.chatboxService.sendMessagePrivate(this.socket,this.listUrls[1],newMessage);
      } else {
        this.chatboxService.sendMessageGroup(this.socket, this.listUrls[2], newMessage);
      }
    }
  }

  // Generates clickable links from text urls
  linkGenerator(s: String) {
    var x = s.split(" ");
    for (let i = 0; i < x.length; i++) {
      if (x[i].match("(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?")) {
        x[i] = "<a href='" + x[i] + "'>" + x[i] + "</a>";
        console.log("url found")
      }
    }
    return x.join(" ");
  }

  // Opens the dialog of files and treats
  openDialog() {
    const dialogRef = this.dialog.open(FileDialogContent);
    dialogRef.componentInstance.filesChange.subscribe(
      data => {
        this.files = data;
        for (let i = 0; i < this.files.length; i++) {
          const formData: FormData = new FormData();
          formData.append('file', this.files[i], this.files[i].name);
          formData.append('userName', this.user.userName as string);
          formData.append('chatId', this.chatObs._id as string);
          this.chatboxService.sendFiles(this.listUrls[0],formData).subscribe(
            e => {
              if (e != null) {
                this.chatboxService.fileSentMessage(this.socket,this.listUrls[3], e.sender, e._id, e.chatId);
              }
            }
          )
        }
      }
    )
  }

  // Differs file types
  recogniseFileType(type: String) {
    if (type == "message") {
      return 0;
    } else if (type == "image/png" || type == "image/jpg" || type == "image/jpeg") {
      return 1;
    } else {
      return 2;
    }
  }

  // Formats byte array images to display them
  formatImage(img: any): any {
    let image = null;
/*    if(img.imageType == "noType"){
      return image;
    }else {*/
/*      // Converts arraybuffer to typed array object
      // converts the typed array to string of characters
      // converts string of characters to base64String
      let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(img.buffer.data)));
      // sanitize the url that is passed as a value to image src attrtibute
      return this.domSanitizer.bypassSecurityTrustUrl('data:' + img.type + ';base64, ' + base64String);*/

      /*const reader = new FileReader();
      reader.onload = (e) => image = e.target.result;
      reader.readAsDataURL(new Blob([img]));
      return image;*/

/*      const blob = new Blob([new Uint8Array(img.buffer.data)], {type: img.type});
      const url =  URL.createObjectURL(blob);
      image = new Image();
      image.onload =() => {
        URL.revokeObjectURL(url);
        resolve(image);
      }
      image.src = url;
      return image;*/

/*      const byteArray = new Uint8Array(img.buffer.data);
      return new Blob([byteArray], {type: img.type});*/

/*      if(img.type != "noType") {
        const TYPED_ARRAY = new Uint8Array(img.buffer.data);
        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        let base64String = btoa(STRING_CHAR);
        return this.domSanitizer.bypassSecurityTrustUrl('data:' + img.type + ';base64, ' + base64String);
      }else{
        return null;
      }*/

/*      const reader = new FileReader();
      reader.onload = (e) => image = e.target.result;
      reader.readAsDataURL(new Blob([img.buffer.data]));
      return image;*/

    let objectURL = 'data:' + img.type +';base64,' + img.buffer.data;

    return this.domSanitizer.bypassSecurityTrustUrl(objectURL);
/*    }*/
  }
  // Event that opens an image "full screen"
  maximizeImage(image: any) {
    const dialogRef = this.dialog.open(ImageDialogContent, {
      data: {image: image},
    });
  }

  // Formats every other object to display it in a new window
  openFile(response: any) {
    const blob = new Blob([new Uint8Array(response.buffer.data)], {type: response.type});
    const exportUrl = URL.createObjectURL(blob);
    window.open(exportUrl);
    URL.revokeObjectURL(exportUrl);
  }

  // Adds an emoji to the textArea
  addEmoji(event) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  changeChatContentState(){
    this.chatContent = !this.chatContent;
    this.startAnimation = true;
  }

}

import {Subject} from "rxjs";
import {resolve} from "url";

@Component({
  selector: 'cc-customizable-chat-chatbox-file-dialog',
  templateUrl: './file-dialog-content.component.html',
})
export class FileDialogContent {
  files: File[] = [];
  filesChange: Subject<File[]> = new Subject();

  onSelect(event) {
    console.log("On select")
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log("On remove");
    this.files.splice(this.files.indexOf(event), 1);
  }

  sendFiles() {
    this.filesChange.next(this.files);
  }
}

