import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  // User modal
  user: any;

  constructor() {
    // 1. try to find user in cookie

  }

  isLogged() {
    return false;
  }
}
