import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IWorkout } from './IWorkout';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { BaseUrlService } from '../shared/base-url.service';
import { IWorkoutTransaction } from './IWorkoutTransaction';

@Injectable()
export class WorkoutService {
  
  //private workoutUrl: string = "./api/workouts.json";//Mock JSON for Testing
  private workoutUrl: string;
  private workoutTxnUrl: string;
  private workoutTxnReportUrl: string;

  workoutMap: any = {};

  constructor(private http: Http,
              private baseUrlSvc: BaseUrlService) { 
    this.workoutUrl = this.baseUrlSvc.getBaseUrl() + "workout";
    this.workoutTxnUrl = this.baseUrlSvc.getBaseUrl() + "wktxn";
    this.workoutTxnReportUrl = this.baseUrlSvc.getBaseUrl() + "wktxn/report";
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

  getWorkoutTransactions(workoutId: number): Observable<IWorkoutTransaction[]>{
    let url = this.workoutTxnUrl + `/${workoutId}`;
    return this.http.get(url)
      .map((resp: Response) => <IWorkoutTransaction[]>resp.json())
      .do(data => console.log("GetTransactionsAPI resp:" + JSON.stringify(data)))
      .catch(this.handleError);    
  }

  getWorkoutTransactionsReport(req: any): Observable<IWorkoutTransaction[]>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    console.log("Sending Workout Report Req: " + JSON.stringify(req));
    return this.http.post(this.workoutTxnReportUrl, req, options)
            .map(this.extractData)
            .do(data => console.log('retrievedReport: ' + JSON.stringify(data)))
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
