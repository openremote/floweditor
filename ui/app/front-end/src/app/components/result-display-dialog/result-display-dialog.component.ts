import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-result-display-dialog',
  templateUrl: './result-display-dialog.component.html',
  styleUrls: ['./result-display-dialog.component.css']
})
export class ResultDisplayDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public ruleset: { data: string, name: string }, private integration: IntegrationService, private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  public upload() {
    console.log(this.ruleset);
    this.integration.addRule(this.ruleset.name, this.ruleset.data, (e) => {
      if (e.status === 200) {
        this.snackbar.open('Successfully added rule', 'Dismiss');
      } else {
        this.snackbar.open('Something went wrong', 'Dismiss');
      }
    });
  }
}
