import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  addNewWorkout(): void {
    this._router.navigate(['/addworkout']);
  }

  trackWorkout(): void {
    this._router.navigate(['/transactions']);
  }

}
