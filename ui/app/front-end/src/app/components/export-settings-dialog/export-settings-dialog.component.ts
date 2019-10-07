import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ExporterService } from 'src/app/services/exporter.service';
import { ResultDisplayDialogComponent } from '../result-display-dialog/result-display-dialog.component';
import { GlobalRuleset, RulesetLang } from '@openremote/model';
import { RestService } from 'src/app/services/rest.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-export-settings-dialog',
  templateUrl: './export-settings-dialog.component.html',
  styleUrls: ['./export-settings-dialog.component.css']
})
export class ExportSettingsDialogComponent implements OnInit {

  public inputName = 'Rule';
  public inputDescription = 'Does things';
  constructor(
    private exporter: ExporterService,
    private project: ProjectService,
    private snackbar: MatSnackBar,
    private rest: RestService,
    private dialog: MatDialog) { }

  ngOnInit() {
  }

  public translateAndShow() {
    console.log(this.inputName);
    this.exporter.export(this.inputName, this.inputDescription, (data: string) => {

      const ruleset = { data, name: this.inputName, description: this.inputDescription };

      this.rest.getRuleResource().then(r => {
        const rs: GlobalRuleset = {
          lang: RulesetLang.FLOW,
          name: ruleset.name,
          type: 'global',
          rules: ruleset.data
        };

        r.createGlobalRuleset(rs).then((e) => {
          if (e.status === 200) {
            this.project.setCurrentProject(e.data, ruleset.name, ruleset.description);
            this.snackbar.open('Successfully added rule', 'Dismiss', { duration: 2000 });
          } else {
            this.snackbar.open('Something went wrong', 'Dismiss', { duration: 4000 });
          }
        });
      });
    });
  }

}
