import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-add',
  templateUrl: './workout-add.component.html',
  styleUrls: ['./workout-add.component.css']
})
export class WorkoutAddComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addWorkout(): void {
    this._router.navigate(['/workouts']);
  }

}
