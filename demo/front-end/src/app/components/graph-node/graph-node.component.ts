import { Component, OnInit, Input } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.css']
})
export class GraphNodeComponent implements OnInit {

  @Input() node: GraphNode;

  constructor() {

  }

  ngOnInit() {
  }

}
