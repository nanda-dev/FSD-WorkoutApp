import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-workout-list-transactions',
  templateUrl: './workout-list-transactions.component.html',
  styleUrls: ['./workout-list-transactions.component.css']
})
export class WorkoutListTransactionsComponent implements OnInit {
  workoutName: string = "Bench Press";

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  trackNewActivity(): void {
    this._router.navigate(['/track']);
  }

}
