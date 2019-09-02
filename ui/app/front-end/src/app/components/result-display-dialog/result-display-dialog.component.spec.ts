import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDisplayDialogComponent } from './result-display-dialog.component';

describe('ResultDisplayDialogComponent', () => {
  let component: ResultDisplayDialogComponent;
  let fixture: ComponentFixture<ResultDisplayDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDisplayDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
