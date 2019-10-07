import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleBrowserComponent } from './rule-browser.component';

describe('RuleBrowserComponent', () => {
  let component: RuleBrowserComponent;
  let fixture: ComponentFixture<RuleBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
