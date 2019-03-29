import { Component, OnInit } from '@angular/core';
import { ExporterService } from 'src/app/services/exporter.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ResultDisplayDialogComponent } from '../result-display-dialog/result-display-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private exporter: ExporterService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
  }

  private exportNodeStructure() {

    this.exporter.export((data) => {
      console.log(data);
      this.dialog.open(ResultDisplayDialogComponent, {data});
    });
  }
}
