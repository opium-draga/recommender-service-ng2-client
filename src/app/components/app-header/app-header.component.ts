import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {RequestService} from "../../services/request";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(public user: UserService,
              public request: RequestService) {}

  getUsers() {
    this.request.get('users')
      .subscribe((response) => {
        console.log(response);
      })
  }

  logout() {
    this.user.logout();
  }

}
