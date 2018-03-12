import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  pageTitle:string = 'Work-IT-Out';
  showLogout: boolean = false;
  showNavLinks: boolean = false;

  constructor(private loginSvc: LoginService){

  }

  doLogout(): void {
    console.log("Logging out...");
    this.showLogout = false;
    this.loginSvc.doLogout();
  }

  ngOnInit() {
    console.log("showLogout?" + this.showLogout);
    this.showLogout = this.loginSvc.isSessionActive();
    console.log("showLogout2?" + this.showLogout);
  }
}
