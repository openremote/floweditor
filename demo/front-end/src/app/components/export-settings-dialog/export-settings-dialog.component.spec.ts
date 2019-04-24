import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportSettingsDialogComponent } from './export-settings-dialog.component';

describe('ExportSettingsDialogComponent', () => {
  let component: ExportSettingsDialogComponent;
  let fixture: ComponentFixture<ExportSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
