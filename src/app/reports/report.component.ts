import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { WorkoutService } from '../workouts/workout.service';
import { IWorkoutTransaction } from '../workouts/IWorkoutTransaction';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
  transactionsReport: IWorkoutTransaction[];
  errMessage: string;

  constructor(private _router: Router,
              private workoutSvc: WorkoutService,
              private fb: FormBuilder,
              private dp: DatePipe) { }

  ngOnInit() {
    this.reportForm = this.fb.group({
      dateRange: [[], [Validators.required]]	  
    });
  }

  getReport(): void {
    console.log("Start Date:" + this.reportForm.controls['dateRange'].value[0] 
      + "\nAlso: " + this.dp.transform(this.reportForm.controls['dateRange'].value[0], 'yyyy-MM-dd 00:00:00'));
    console.log("End Date:" + this.reportForm.controls['dateRange'].value[1]
      + "\nAlso: " + this.dp.transform(this.reportForm.controls['dateRange'].value[1], 'yyyy-MM-dd 11:59:59'));
    let req = {};
    req['startTime'] = this.dp.transform(this.reportForm.controls['dateRange'].value[0], 'yyyy-MM-dd 00:00:00');
    req['endTime'] = this.dp.transform(this.reportForm.controls['dateRange'].value[1], 'yyyy-MM-dd 00:00:00');

    this.workoutSvc.getWorkoutTransactionsReport(req).subscribe(
      resp => this.transactionsReport = resp,
      error => this.errMessage = <any>error);
      //this._router.navigate(['/report']);
  }
}
