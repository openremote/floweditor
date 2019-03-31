import { Component, OnInit } from '@angular/core';
import { ExporterService } from 'src/app/services/exporter.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ResultDisplayDialogComponent } from '../result-display-dialog/result-display-dialog.component';
import { SettingsPanelComponent } from '../settings-panel/settings-panel.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private exporter: ExporterService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
  }

  private showSettings() {
    this.dialog.open(SettingsPanelComponent);
  }

  private exportNodeStructure() {
    this.exporter.export((data) => {
      console.log(data.normalize());
      this.dialog.open(ResultDisplayDialogComponent, { data });
    });
  }
}
