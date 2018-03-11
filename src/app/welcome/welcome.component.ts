import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  showLogin: boolean = false;  

  constructor(private loginSvc: LoginService) { }

  ngOnInit() {
    console.log("LoginComponent - show Login on init = " + this.showLogin);
    this.showLogin = !this.loginSvc.isSessionActive();
    console.log("LoginComponent - really show Login? " + this.showLogin);

  }

  
}
