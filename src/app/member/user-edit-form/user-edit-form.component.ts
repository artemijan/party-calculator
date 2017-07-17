import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css']
})
export class UserEditFormComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User();
  }

}
