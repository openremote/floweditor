import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ExporterService } from 'src/app/services/exporter.service';
import { ResultDisplayDialogComponent } from '../result-display-dialog/result-display-dialog.component';

@Component({
  selector: 'app-export-settings-dialog',
  templateUrl: './export-settings-dialog.component.html',
  styleUrls: ['./export-settings-dialog.component.css']
})
export class ExportSettingsDialogComponent implements OnInit {

  public inputName = 'Rule';
  constructor(private exporter: ExporterService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  public translateAndShow() {
    console.log(this.inputName);
    this.exporter.export(this.inputName, (data: string) => {

      const ruleset = { data, name: this.inputName };
      console.log(ruleset);

      this.dialog.open(ResultDisplayDialogComponent, { data: ruleset });
    });
  }

}
