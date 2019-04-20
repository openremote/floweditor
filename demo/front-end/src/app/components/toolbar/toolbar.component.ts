import { Component, OnInit } from '@angular/core';
import { ExporterService } from 'src/app/services/exporter.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ResultDisplayDialogComponent } from '../result-display-dialog/result-display-dialog.component';
import { SettingsPanelComponent } from '../settings-panel/settings-panel.component';
import { ExportSettingsDialogComponent } from '../export-settings-dialog/export-settings-dialog.component';
import { SelectionService } from 'src/app/services/selection.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private project: ProjectService,
    private selection: SelectionService) { }

  ngOnInit() {
  }

  private clear() {
    this.project.nodes = [];
  }

  private showSettings() {
    this.dialog.open(SettingsPanelComponent);
  }

  private showHelp() {
    this.dialog.open(HelpDialogComponent);
  }

  private exportNodeStructure() {
    this.dialog.open(ExportSettingsDialogComponent);
  }
}
