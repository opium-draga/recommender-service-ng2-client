import {Injectable} from '@angular/core';
import {RequestService} from "./request";
import {EmitterService} from "./emitter.service";

@Injectable()
export class UserService {

  user: any;

  constructor(private request: RequestService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser) {
      this.user = Object.assign({}, currentUser, {logged: true});
      this.setToken(this.user.token);
    } else {
      this.user = {
        logged: false
      }
    }
  }

  login(email: string, password: string): any {
    return this.request.post('auth', {username: email, password: password})
      .map((response: any) => {
        debugger;
        if (response.access_token) {
          const token = response.access_token;

          this.setToken(token);

          localStorage.setItem('currentUser', JSON.stringify({
            email: email,
            token: token
          }));

          return {
            data: token,
            error: "",
            success: true
          }
        }

        return response;
      })
  }

  isLogged() {
    return this.user.logged;
  }

  private setToken(token: string) {
    EmitterService.get(EmitterService.keys.TOKEN).emit(token);
  }
}
