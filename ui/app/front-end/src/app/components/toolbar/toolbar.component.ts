import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SettingsPanelComponent } from '../settings-panel/settings-panel.component';
import { ExportSettingsDialogComponent } from '../export-settings-dialog/export-settings-dialog.component';
import { SelectionService } from 'src/app/services/selection.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ProjectService } from 'src/app/services/project.service';
import { IntegrationService, IntegrationServiceStatus } from 'src/app/services/integration.service';
import { NodeUtilities, GraphNodeCollection } from 'node-structure';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private project: ProjectService,
    public selection: SelectionService,
    public integration: IntegrationService) { }

  ngOnInit() {
  }

  public clear() {
    this.project.nodes = [];
    this.project.connections = [];
    this.selection.nodes = this.project.nodes;
    this.selection.selectedNodes = [];
  }

  public exit() {
    if (this.integration.getStatus() === IntegrationServiceStatus.Authenticated) {
      this.integration.logout();
    } else {
      this.integration.initialise();
    }
  }

  public showSettings() {
    this.dialog.open(SettingsPanelComponent);
  }

  public showHelp() {
    this.dialog.open(HelpDialogComponent);
  }

  public exportNodeStructure() {
    this.dialog.open(ExportSettingsDialogComponent);
  }

  public debugSave() {
    const collection = new GraphNodeCollection(this.project.nodes, this.project.connections);
    const stored = NodeUtilities.convertToServerReady('a', 'b', collection);
    localStorage.debugStorage = JSON.stringify(stored);
  }

  public debugLoad() {
    const collection = JSON.parse(localStorage.debugStorage);
    const converted = NodeUtilities.convertToNormal(collection);
    console.log(collection);
    console.log(converted);

    this.clear();
    this.project.nodes = converted.nodes.map((n) => {
      n.position.x -= 200;
      n.position.y -= 32;
      return n;
    });
    this.project.connections = converted.connections;
  }
}
