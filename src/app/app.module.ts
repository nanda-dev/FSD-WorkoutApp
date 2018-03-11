import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//ngModel - two way data binding
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DatePipe } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkoutListComponent } from './workouts/workout-list.component';
import { WorkoutAddComponent } from './workouts/workout-add.component';
import { UserRegisterComponent } from './user/user-register.component';
import { WorkoutTrackComponent } from './workouts/workout-track.component';
import { ReportComponent } from './reports/report.component';
import { WorkoutListTransactionsComponent } from './workouts/workout-list-transactions.component';
import { WorkoutService } from './workouts/workout.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { UserService } from './shared/user.service';
import { BaseUrlService } from './shared/base-url.service';
import { ConvertFromSecondsPipe } from './shared/convert-from-seconds.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    WorkoutListComponent,
    WorkoutAddComponent,
    UserRegisterComponent,
    WorkoutTrackComponent,
    ReportComponent,
    WorkoutListTransactionsComponent,
    LoginComponent,
    ConvertFromSecondsPipe

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'signup', component: UserRegisterComponent},
      {path: 'workouts', component: WorkoutListComponent},
      {path: 'addworkout', component: WorkoutAddComponent},
      {path: 'transactions/:id', component: WorkoutListTransactionsComponent},
      {path: 'track', component: WorkoutTrackComponent},
      {path: 'report', component: ReportComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ]),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [WorkoutService, LoginService, UserService, BaseUrlService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
