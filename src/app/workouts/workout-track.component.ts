import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { WorkoutService } from './workout.service';
import { IWorkoutTransaction } from './IWorkoutTransaction';

@Component({
  selector: 'app-workout-track',
  templateUrl: './workout-track.component.html',
  styleUrls: ['./workout-track.component.css']
})
export class WorkoutTrackComponent implements OnInit {  
  workoutName: string;
  workoutId: number;
  transactionForm: FormGroup;

  showMin: boolean = true;
  showSec: boolean = true;

  startTime: Date;
  endTime: Date;

  hstep: number = 1;
  minEndTime: Date;
  isEndTimeDisabled: boolean = true;
  validStartTime: boolean;
  validEndTime: boolean;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private workoutSvc: WorkoutService,
              private fb: FormBuilder,
              private dp: DatePipe) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.workoutId = +params['id'];      
    });

    this.workoutName = this.workoutSvc.getWorkoutName(this.workoutId);

    let now = new Date();

    this.transactionForm = this.fb.group({
      workoutDate: [now, [Validators.required]],
      startTime: undefined,
      endTime: undefined,
      workoutId: undefined,
      duration: undefined,
      calsBurnt: undefined	  
    });
  }

  trackWorkout(): void {
    let workoutDate = this.transactionForm.controls['workoutDate'].value;
    
    console.log("WorkoutDate: " + this.dp.transform(workoutDate, 'yyyy-MM-dd'));
    console.log("startDate: " + this.dp.transform(this.startTime, 'HH:mm:ss'));
    console.log("endDate: " + this.dp.transform(this.endTime, 'HH:mm:ss'));

    console.log("endTime.h=" + this.endTime.getHours() + ", startTime.h=" + this.startTime.getHours());
    if(this.endTime.getHours() < this.startTime.getHours()){
      console.log("End time cannot be greater than start time.");
      this.endTime.setHours(this.startTime.getHours());
      
    }

    var txn: IWorkoutTransaction = {
      id: undefined,
      workoutId: this.workoutId,
      startTime: this.dp.transform(workoutDate, 'yyyy-MM-dd') 
                  + ' ' 
                  + this.dp.transform(this.startTime, 'HH:mm:ss'),
      endTime: this.dp.transform(workoutDate, 'yyyy-MM-dd') 
                + ' ' 
                + this.dp.transform(this.endTime, 'HH:mm:ss'),
      duration: undefined,
      calsBurnt: undefined
    };
        
    console.log("req.s=" + txn['startTime']);
    console.log("req.e=" + txn['endTime']);

    this.workoutSvc.addWorkoutTransaction(txn).subscribe(resp => {
      console.log("Add Workout Transaction Respone: " + resp);
      this.router.navigate(['/transactions', this.workoutId]);
    });
    
  }

  onEditStartTime() {
    this.isEndTimeDisabled = !this.isEndTimeDisabled;
    this.endTime = this.startTime;
    this.endTime.setHours(this.startTime.getHours() + 1);
  }

  isValidStartTime(event: boolean): void {
    this.validStartTime = event;
    console.log("Valid start time?" + this.validStartTime);
  }

  isValidEndTime(event: boolean): void {
    this.validEndTime = event;
    console.log("Valid end time?" + this.validEndTime);
  }
  

}
