import { Component, OnInit, Input } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-graph-node-menu-item',
  templateUrl: './graph-node-menu-item.component.html',
  styleUrls: ['./graph-node-menu-item.component.css']
})
export class GraphNodeMenuItemComponent implements OnInit {
  @Input() node: GraphNode;

  constructor(public project: ProjectService) {

   }

  ngOnInit() {
  }

  addNodeToProject() {
    this.project.nodes.push(this.node.getClone());
  }
}
