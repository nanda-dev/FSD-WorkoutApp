import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

  sessionActive: boolean = true;

  constructor() { }

  isSessionActive(): boolean {
    return this.sessionActive;
  }

  doLogin(): void {
    this.sessionActive = true;
  }

  doLogout(): void {
    this.sessionActive = false;
  }

}
