import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private user: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (!this.user.isLogged()) {
      this.router.navigate(['/pages/login']);
      return false;
    }

    return true;
  }

}