import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {APIResponse} from "../../models/response";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  model: any = {
    name: "",
    email: "",
    password: ""
  };

  error = "";

  constructor(private userService: UserService,
              private router: Router) {
  }

  register() {
    this.userService.register(this.model).subscribe((response: APIResponse) => {
      if (response.isSuccess()) {
        this.router.navigate(['/pages/login']);
      } else {
        this.error = response.getError();
      }
    })
  }
}
