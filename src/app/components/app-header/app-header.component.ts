import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {RequestService} from "../../services/request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(public user: UserService,
              public request: RequestService,
              private router: Router) {
  }

  getUsers() {
    this.request.get('users').subscribe((response) => {
      console.log(response);
    })
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/pages/login']);
  }
}
