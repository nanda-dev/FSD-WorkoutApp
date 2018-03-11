import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IWorkout } from './IWorkout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { BaseUrlService } from '../shared/base-url.service';

@Injectable()
export class WorkoutService {
  
  //private workoutUrl: string = "./api/workouts.json";//Mock JSON for Testing
  private workoutUrl: string;

  workoutMap: any = {};

  constructor(private http: Http,
              private baseUrlSvc: BaseUrlService) { 
    this.workoutUrl = this.baseUrlSvc.getBaseUrl() + "workout";
  }

  getWorkoutsOfUser(userId: number): Observable<IWorkout[]> {
    let url = this.workoutUrl + `/${userId}`;
    return this.http.get(url)
      .map((resp: Response) => <IWorkout[]>resp.json())
      .do(data => {
        console.log("GetWorkouts API Returned:" + JSON.stringify(data));
        for(let w of data){
          //console.log(w.id + "--" + w.title);
          this.workoutMap[w.id] = w.title;
        }
        console.log("workoutMap=" + JSON.stringify(this.workoutMap));
      })      
      .catch(this.handleError);                      
  }

  getWorkout(workoutId: number): Observable<IWorkout> {
    return this.http.get(this.workoutUrl)
      .map((resp: Response) => <IWorkout>resp.json())
      .do(data => console.log(JSON.stringify(data)))
      .catch(this.handleError);
  }

  addWorkout(workout: IWorkout) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    workout.id = undefined;
    console.log("Sending Workout: " + JSON.stringify(workout));
    return this.http.post(this.workoutUrl, workout, options)
            .map(this.extractData)
            .do(data => console.log('createdWorkout: ' + JSON.stringify(data)))
            .catch(this.handleError);
  }

  getWorkoutName(workoutId: number) {
    return this.workoutMap[workoutId];
  }
  private extractData(response: Response) {
    let body = response.json();
    return body || {};
  }

  handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
  }
}
