import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser } from './IUser';
import { BaseUrlService } from '../shared/base-url.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {
  baseUrl: string = "";
  sessionActive: boolean = true;
  activeUser: IUser;
  private loggedIn = new BehaviorSubject<boolean>(false);
  

  constructor(private http: Http,
    private baseUrlSvc: BaseUrlService) { 
      this.baseUrl = baseUrlSvc.getBaseUrl();
  }

  registerUser(user: IUser) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    user.id = undefined;
    console.log("Sending User: " + JSON.stringify(user));
    return this.http.post(this.baseUrl + "user", user, options)
            .map(this.extractData)
            .do(data => console.log('createUser: ' + JSON.stringify(data)))
            .catch(this.handleError);
  }

  doLogin(user: IUser): Observable<IUser> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    user.id = undefined;
    console.log("Call login api for user:" + JSON.stringify(user));
    console.log("endpoint url=" + this.baseUrl + "user/login");
    return this.http.post(this.baseUrl + "user/login", user, options)
            .map(this.extractData)
            .do(data => {
              console.log('Log-in returned: ' + JSON.stringify(data));
              this.activeUser = <IUser>data;
              this.sessionActive = true;

              })
            .catch(this.handleError);
    
  }

  doLogout(): void {
    this.sessionActive = false;
    this.activeUser = null;
  }

  isSessionActive(): boolean {
    return this.sessionActive;
  }

  getLoggedInUser(): IUser {
    return this.activeUser;
  }

  getLoggedInUserId(): number {
    return this.activeUser ? this.activeUser.id : 0;
  }

  isLoggedIn(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
