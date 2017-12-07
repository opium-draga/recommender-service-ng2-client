import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  modal: any = {};

  constructor(private userService: UserService) {
  }

  register() {
    debugger;
    this.modal;

  }

}
