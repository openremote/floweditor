import { Component, OnInit } from '@angular/core';
import { NodeDataType } from '@openremote/model';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.css']
})
export class HelpDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public getAllTypes(): NodeDataType[] {
    return [
      NodeDataType.ANY,
      NodeDataType.BOOLEAN,
      NodeDataType.COLOR,
      NodeDataType.NUMBER,
      NodeDataType.STRING,
      NodeDataType.TRIGGER,
    ];
  }
}
