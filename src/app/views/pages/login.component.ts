import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Response} from "../../models/response";

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  userModel: any = {
    email: "",
    password: ""
  };

  loginFailed = false;

  constructor(private user: UserService) {

  }

  login() {
    this.loginFailed = false;
    this.user.login(this.userModel.email, this.userModel.password)
      .subscribe((resp: Response) => {
        if(resp.success) {
          // redirect
          alert('Success');
        } else {
          this.loginFailed = true;
        }
      });

    return false;
  }
}
