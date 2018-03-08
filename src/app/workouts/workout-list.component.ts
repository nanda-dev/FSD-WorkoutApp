import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from './workout.service';
import { IWorkout } from './IWorkout';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  errorMessage: string;
  workouts: IWorkout[];
  

  constructor(private _router: Router,
              private workoutSvc: WorkoutService) { }

  ngOnInit() {
    this.workoutSvc.getWorkoutsOfUser(1).subscribe(
      workouts => this.workouts = workouts,
      error => this.errorMessage = <any>error
    );
  }

  addNewWorkout(): void {
    this._router.navigate(['/addworkout']);
  }

  trackWorkout(workoutId: number): void {
    console.log("show transactions for workout : " + workoutId);
    this._router.navigate(['/transactions', workoutId]);
  }

}
