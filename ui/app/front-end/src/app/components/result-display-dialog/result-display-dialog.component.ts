import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IntegrationService } from 'src/app/services/integration.service';
import { RestService } from 'src/app/services/rest.service';
import { GlobalRuleset, RulesetLang } from '@openremote/model';

@Component({
  selector: 'app-result-display-dialog',
  templateUrl: './result-display-dialog.component.html',
  styleUrls: ['./result-display-dialog.component.css']
})
export class ResultDisplayDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public ruleset: { data: string, name: string },
    private rest: RestService,
    private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  public upload() {
    this.rest.getRuleResource().then(r => {
      const rs: GlobalRuleset = {
        lang: RulesetLang.FLOW,
        name: this.ruleset.name,
        type: 'global',
        rules: this.ruleset.data
      };

      r.createGlobalRuleset(rs).then((e) => {
        if (e.status === 200) {
          this.snackbar.open('Successfully added rule', null, {duration: 2000});
        } else {
          this.snackbar.open('Something went wrong',  null, {duration: 4000});
        }
      });
    });
  }
}
