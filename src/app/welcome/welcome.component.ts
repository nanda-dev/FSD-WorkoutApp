import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUser } from './login-user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loginForm: FormGroup;
  loginUser: LoginUser;

  constructor(private _router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
     this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ''
    });
  }

  login(): void {
    this._router.navigate(['/workouts']);
  }
  signup(): void {
    this._router.navigate(['/signup']);
  }
}
