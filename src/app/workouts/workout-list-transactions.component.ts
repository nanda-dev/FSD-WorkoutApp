import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkoutService } from './workout.service';
import { IWorkoutTransaction } from './IWorkoutTransaction';


@Component({
  selector: 'app-workout-list-transactions',
  templateUrl: './workout-list-transactions.component.html',
  styleUrls: ['./workout-list-transactions.component.css']
})
export class WorkoutListTransactionsComponent implements OnInit {
  
  workoutName: string = "";
  workoutId: number;
  transactions: IWorkoutTransaction[];
  errorMessage: string;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private workoutSvc: WorkoutService) { 
    
    //this.workoutId = this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.workoutId = +params['id'];
      this.workoutSvc.getWorkoutTransactions(this.workoutId).subscribe(
        transactions => this.transactions = transactions,
        error => this.errorMessage = <any>error
      );
    });

    this.workoutName = this.workoutSvc.getWorkoutName(this.workoutId);
    
  }

  trackNewActivity(): void {
    this._router.navigate(['/track']);
  }

  getWorkout(workoutId: number): any {
    console.log("fetch workout " + workoutId);
  }
}
