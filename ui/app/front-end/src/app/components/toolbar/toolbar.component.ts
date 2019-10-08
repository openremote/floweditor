import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { SettingsPanelComponent } from '../settings-panel/settings-panel.component';
import { ExportSettingsDialogComponent } from '../export-settings-dialog/export-settings-dialog.component';
import { SelectionService } from 'src/app/services/selection.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { ProjectService } from 'src/app/services/project.service';
import { IntegrationService, IntegrationServiceStatus } from 'src/app/services/integration.service';
import { NodeCollection, NodePosition, Node, GlobalRuleset, RulesetLang, RulesetChangedEvent } from '@openremote/model';
import { RestService } from 'src/app/services/rest.service';
import { ExporterService } from 'src/app/services/exporter.service';
import { RuleBrowserComponent } from '../rule-browser/rule-browser.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public project: ProjectService,
    private snackbar: MatSnackBar,
    public rest: RestService,
    private exporter: ExporterService,
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

  public saveAs() {
    this.dialog.open(ExportSettingsDialogComponent);
  }

  public save() {
    if (this.project.existingFlowRuleId != null) {
      this.rest.getRuleResource().then(r => {
        this.exporter.export(this.project.existingFlowRuleName, this.project.existingFlowRuleDesc, (data: string) => {
          const grs = r.getGlobalRuleset(this.project.existingFlowRuleId).then(existingRuleset => {
            const existing = existingRuleset.data;
            existing.rules = data;

            r.updateGlobalRuleset(existing.id, existing).then((e) => {
              if (e.status === 204) {
                this.snackbar.open('Successfully updated rule', 'Dismiss', { duration: 2000 });
                this.project.isInUnsavedState = false;
              } else {
                this.snackbar.open('Something went wrong', 'Dismiss', { duration: 4000 });
              }
            });
          });
        });
      });
    } else {
      this.saveAs();
    }
  }

  public delete() {
    this.rest.getRuleResource().then(r => {
      r.deleteGlobalRuleset(this.project.existingFlowRuleId).then((e) => {

        if (e.status === 204) {
          this.snackbar.open('Successfully deleted rule', 'Dismiss', { duration: 2000 });
          this.newRule();
        } else {
          this.snackbar.open('Something went wrong', 'Dismiss', { duration: 4000 });
        }
      });
    });
  }

  public newRule() {
    this.clear();
    this.project.existingFlowRuleId = -1;
  }

  public open() {
    const ruleBrowser: MatDialogRef<RuleBrowserComponent, GlobalRuleset> = this.dialog.open(RuleBrowserComponent);
    ruleBrowser.afterClosed().subscribe((rule) => {
      if (rule) {
        try {
          const collection: NodeCollection = JSON.parse(rule.rules);

          this.clear();
          this.project.connections = [];
          this.project.nodes = collection.nodes.map((n: Node) => {
            n.position.x -= 200;
            n.position.y -= 32;
            return n;
          });
          this.selection.nodes = this.project.nodes;
          this.project.connections = collection.connections;

          this.project.setCurrentProject(rule.id, rule.name, collection.description);
        } catch (e) {
          console.error(e);
          this.snackbar.open('Invalid rule', 'Dismiss', { duration: 4000 });
          return;
        }
      }
    });
  }
  /*
    public debugSave() {
      const collection: NodeCollection = { nodes: this.project.nodes, connections: this.project.connections };
      localStorage.debugStorage = JSON.stringify(collection);
    }

    public debugLoad() {
      const collection = JSON.parse(localStorage.debugStorage);
      console.log(collection);

      this.clear();
      this.project.nodes = collection.nodes.map((n: Node) => {
        n.position.x -= 200;
        n.position.y -= 32;
        return n;
      });
      this.selection.nodes = this.project.nodes;
      this.project.connections = collection.connections;
    }
    */
}
