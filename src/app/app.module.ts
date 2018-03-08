import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { WorkoutComponent } from './workouts/workout.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkoutListComponent } from './workouts/workout-list.component';
import { WorkoutAddComponent } from './workouts/workout-add.component';
import { UserRegisterComponent } from './user/user-register.component';
import { WorkoutTrackComponent } from './workouts/workout-track.component';
import { ReportComponent } from './reports/report.component';


@NgModule({
  declarations: [
    AppComponent,
    WorkoutComponent,
    WelcomeComponent,
    WorkoutListComponent,
    WorkoutAddComponent,
    UserRegisterComponent,
    WorkoutTrackComponent,
    ReportComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent},
      {path: 'signup', component: UserRegisterComponent},
      {path: 'workouts', component: WorkoutListComponent},
      {path: 'addworkout', component: WorkoutAddComponent},
      {path: 'track', component: WorkoutTrackComponent},
      {path: 'report', component: ReportComponent},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
