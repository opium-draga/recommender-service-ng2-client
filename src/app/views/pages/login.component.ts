import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {APIResponse} from "../../models/response";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  userModel: any = {
    email: "",
    password: ""
  };

  loginFailed = false;

  constructor(private user: UserService,
              private router: Router) {
  }

  login() {
    this.loginFailed = false;
    this.user.login(this.userModel.email, this.userModel.password)
      .subscribe((response: APIResponse) => {
        if(response.isSuccess() && response.getData().length) {
          this.router.navigate(['dashboard']);
        } else {
          this.loginFailed = true;
        }
      });

    return false;
  }
}
