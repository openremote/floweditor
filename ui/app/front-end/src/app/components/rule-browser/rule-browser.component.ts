import { Component, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AssetPickerDialogComponent } from '../asset-picker-dialog/asset-picker-dialog.component';
import { RestService } from 'src/app/services/rest.service';
import { GlobalRuleset, RulesetLang } from '@openremote/model';

@Component({
  selector: 'app-rule-browser',
  templateUrl: './rule-browser.component.html',
  styleUrls: ['./rule-browser.component.css']
})
export class RuleBrowserComponent implements AfterViewInit {
  private chosenRule: GlobalRuleset = null;
  public status = 0;
  public rules: GlobalRuleset[] = [];
  constructor(public dialogRef: MatDialogRef<AssetPickerDialogComponent>, private rest: RestService) { }

  async ngAfterViewInit() {
    this.status = 0;
    try {
      const resource = await this.rest.getRuleResource();
      this.rules = (await resource.getGlobalRulesets({
        fullyPopulate: true,
        language: RulesetLang.FLOW
      })).data;

      this.rules = this.rules.sort((a: GlobalRuleset, b: GlobalRuleset) => {
        return a.lastModified.valueOf() - b.lastModified.valueOf();
      });

      this.status = 1;
    } catch (e) {
      this.status = -1;
      console.error(e);
    }
  }

  close(chosenRule: GlobalRuleset) {
    this.dialogRef.close(chosenRule);
  }
}
