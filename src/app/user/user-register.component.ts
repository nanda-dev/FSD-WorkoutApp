import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  userSignup(): void {
    this._router.navigate(['/workouts']);
  }
}
