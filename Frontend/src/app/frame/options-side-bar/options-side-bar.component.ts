import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../models/login";

@Component({
  selector: 'app-options-side-bar',
  templateUrl: './options-side-bar.component.html',
  styleUrls: ['./options-side-bar.component.css']
})
export class OptionsSideBarComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
