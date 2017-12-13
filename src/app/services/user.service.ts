import {Injectable} from '@angular/core';
import {RequestService} from "./request";
import {EmitterService} from "./emitter.service";
import {Router} from "@angular/router";
import {Response} from "../models/response";

@Injectable()
export class UserService {

  user: any;

  constructor(private request: RequestService,
              private router: Router) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser) {
      this.user = currentUser;
      this.setToken(this.user.token);
    } else {
      this.user = {
        logged: false
      }
    }
  }

  login(email: string, password: string): any {
    return this.request.post('auth', {username: email, password: password})
      .map((response: Response) => {
        if (response.success && response.data.length) {
          const data = response.data[0];

          this.setToken(data.token);

          this.user = {
            model: data.model,
            token: data.token,
            logged: true
          };

          localStorage.setItem('currentUser', JSON.stringify(this.user));
        }

        return response;
      })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.user = {
      logged: false
    };
    this.router.navigate(['/pages/login']);
  }

  isLogged() {
    return this.user.logged;
  }

  private setToken(token: string) {
    EmitterService.get(EmitterService.keys.TOKEN).emit(token);
  }
}
