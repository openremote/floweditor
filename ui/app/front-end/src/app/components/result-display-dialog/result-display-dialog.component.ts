import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-result-display-dialog',
  templateUrl: './result-display-dialog.component.html',
  styleUrls: ['./result-display-dialog.component.css']
})
export class ResultDisplayDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }
}
