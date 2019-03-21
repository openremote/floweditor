import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolpanelComponent } from './toolpanel.component';

describe('ToolpanelComponent', () => {
  let component: ToolpanelComponent;
  let fixture: ComponentFixture<ToolpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
