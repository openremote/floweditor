import { Component, OnInit } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';
import { StandardGraphNodes } from 'src/app/models/StandardGraphNodes';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  public nodes: GraphNode[] = [];

  constructor() {
    this.nodes.push(StandardGraphNodes.CreateAddNode());
    this.nodes.push(StandardGraphNodes.CreateNumberNode());
    this.nodes.push(StandardGraphNodes.CreateTextNode());
  }

  ngOnInit() {
  }

}
