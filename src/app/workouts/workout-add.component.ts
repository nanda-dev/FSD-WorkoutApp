import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { WorkoutService } from './workout.service';

@Component({
  selector: 'app-workout-add',
  templateUrl: './workout-add.component.html',
  styleUrls: ['./workout-add.component.css']
})
export class WorkoutAddComponent implements OnInit {
  addWorkoutForm: FormGroup;

  constructor(private _router: Router,
              private fb: FormBuilder,
              private userSvc: UserService,
              private workoutSvc: WorkoutService) { }

  ngOnInit() {
    this.addWorkoutForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      calsBurnt: ['', [Validators.required]],
      unit: ['',[Validators.required]],
      id: undefined,
      userId: undefined		  
    });
  }

  addWorkout(): void {
    let w = Object.assign({}, this.addWorkoutForm.value);
    w['userId'] = this.userSvc.getLoggedInUser().id;
    this.workoutSvc.addWorkout(w).subscribe(resp => {
      console.log("Add Workout Respone: " + resp);
      this._router.navigate(['/workouts']);
    });
    
  }
  

}
