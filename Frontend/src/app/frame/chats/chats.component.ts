import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/login";


@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  @Input() user : User;

  constructor() { }

  ngOnInit(): void {
  }

}
