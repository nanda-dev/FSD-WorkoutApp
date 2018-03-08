import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-workout-list-transactions',
  templateUrl: './workout-list-transactions.component.html',
  styleUrls: ['./workout-list-transactions.component.css']
})
export class WorkoutListTransactionsComponent implements OnInit {
  
  workoutName: string = "";
  workoutId: number;

  constructor(private _router: Router,
              private _route: ActivatedRoute) { 
    
    //this.workoutId = this._route.snapshot.params['id'];
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.workoutId = +params['id'];
      this.getWorkout(this.workoutId);
    });

    
  }

  trackNewActivity(): void {
    this._router.navigate(['/track']);
  }

  getWorkout(workoutId: number): any {
    console.log("fetch workout " + workoutId);
  }
}
