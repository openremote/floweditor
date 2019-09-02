import { Component, OnInit } from '@angular/core';
import { GraphDataTypes } from 'src/app/models/graph.data.types';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private getAllTypes(): GraphDataTypes[] {
    return [
      GraphDataTypes.Any,
      GraphDataTypes.Boolean,
      GraphDataTypes.Color,
      GraphDataTypes.Number,
      GraphDataTypes.String,
      GraphDataTypes.Trigger,
    ];
  }
}
