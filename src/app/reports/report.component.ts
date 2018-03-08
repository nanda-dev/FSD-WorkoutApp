import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  showReport(): void {
    this._router.navigate(['/workouts']);
  }
}