import { Component, OnInit, Input } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';
import { GraphNodeType } from 'src/app/models/GraphNodeType';
import { GraphSocket } from 'src/app/models/GraphSocket';
import { GraphDataTypes } from 'src/app/models/GraphDataTypes';
import { StandardGraphNodes } from 'src/app/models/StandardGraphNodes';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.css']
})
export class GraphNodeComponent implements OnInit {

  @Input() node: GraphNode;

  constructor() {
    this.node = StandardGraphNodes.CreateAddNode();
   }

  ngOnInit() {
  }

}
