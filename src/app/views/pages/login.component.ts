import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  constructor(private user: UserService) {

  }

  login() {

  }



}
