import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutListTransactionsComponent } from './workout-list-transactions.component';

describe('WorkoutListTransactionsComponent', () => {
  let component: WorkoutListTransactionsComponent;
  let fixture: ComponentFixture<WorkoutListTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkoutListTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutListTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
