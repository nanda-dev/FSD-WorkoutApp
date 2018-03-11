import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IUser } from '../shared/IUser';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  errorMessage: string;
  registrationForm: FormGroup;
  user: IUser;

  constructor(private _router: Router,
              private userSvc: UserService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      rePassword: ['',[Validators.required]]		  
    });
  }

  userSignup(): void {
    let u = Object.assign({}, this.user, this.registrationForm.value);
    this.userSvc.registerUser(u)
				.subscribe(resp => {
					console.log('API Resp:' + JSON.stringify(resp));
					this.resetForm();
					this._router.navigate(['/welcome']);																
				},
				error => this.errorMessage = <any>error);
    
  }

  resetForm(): void {
		this.registrationForm.reset();
				
  }
}
