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

  constructor(private loginSvc: LoginService){

  }

  doLogout(): void {
    console.log("Logging out...");
    this.loginSvc.doLogout();
  }

  ngOnInit() {
    this.showLogout = this.loginSvc.isSessionActive();
  }
}
