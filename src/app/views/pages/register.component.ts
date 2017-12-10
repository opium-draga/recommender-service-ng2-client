import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  modal: any = {
    name: "Yaroslav",
    email: "gandgbandg@gmail.com",
    password: "123qwe"
  };

  constructor(private userService: UserService) {
  }

  register() {

  }

}
