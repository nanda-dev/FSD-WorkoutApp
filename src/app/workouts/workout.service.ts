import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IWorkout } from './IWorkout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class WorkoutService {
  
  private _workoutUrl: string = "./api/workouts.json";

  constructor(private _http: HttpClient) { }

  getWorkoutsOfUser(userId: number): Observable<IWorkout[]> {
    return this._http.get<IWorkout[]>(this._workoutUrl)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);                      
  }

  getWorkout(workoutId: number): Observable<IWorkout> {
    return this._http.get<IWorkout>(this._workoutUrl)
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }
}
