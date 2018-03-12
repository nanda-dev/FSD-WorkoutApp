import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from './workout.service';
import { IWorkout } from './IWorkout';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  errorMessage: string;
  workouts: IWorkout[];
  

  constructor(private _router: Router,
              private workoutSvc: WorkoutService,
              private userSvc: UserService) { }

  ngOnInit() {
    console.log("User Logged in ? " + this.userSvc.isSessionActive());
    console.log("Current User: " + JSON.stringify(this.userSvc.getLoggedInUser()));
    if(this.userSvc.isSessionActive()){
      let u = this.userSvc.getLoggedInUser();
      if(u){
        console.log("Fetch workouts of user: " + u.id);
        this.workoutSvc.getWorkoutsOfUser(u.id).subscribe(
          workouts => this.workouts = workouts,
          error => this.errorMessage = <any>error
        );
      }
      
    }
    else{
      this._router.navigate(['/login']);
    }
    
  }

  addNewWorkout(): void {
    this._router.navigate(['/addworkout']);
  }

  trackWorkout(workoutId: number): void {
    console.log("show transactions for workout : " + workoutId);
    this._router.navigate(['/transactions', workoutId]);
  }

}
