import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUser } from './login-user';
import { UserService } from '../shared/user.service';
import { IUser } from '../shared/IUser';
import { error } from 'selenium-webdriver';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLogin: boolean = false;
  loginForm: FormGroup;
  loginUser: LoginUser;
  user: IUser;
  constructor(private _router: Router,
    private fb: FormBuilder,
    private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.doLogout();
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ''
    });
    
  }

  login(): void {
    let u = Object.assign({}, this.loginUser, this.loginForm.value);
    u.name = u.userName;
    delete u['userName'];
    console.log("loginUser: " + JSON.stringify(u));
    this.userSvc.doLogin(u).subscribe(resp => {      
      console.log("Log-in response:" + JSON.stringify(resp));
      this._router.navigate(['/workouts']);
    }, error => console.log("Error during login" + <any>error));
    
  }
  signup(): void {
    this._router.navigate(['/signup']);
  }

}
