import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-track',
  templateUrl: './workout-track.component.html',
  styleUrls: ['./workout-track.component.css']
})
export class WorkoutTrackComponent implements OnInit {
  workoutName: string = "Bench Press";
  
  constructor(private _route: Router) { }

  ngOnInit() {
  }

  trackWorkout(): void {
    this._route.navigate(['/workouts']);
  }

}
