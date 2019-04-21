import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { GraphNode } from 'src/app/models/graph.node';
import { ProjectService } from 'src/app/services/project.service';
import { CopyMachine } from 'src/app/logic/copy.machine';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-graph-node-menu-item',
  templateUrl: './graph-node-menu-item.component.html',
  styleUrls: ['./graph-node-menu-item.component.css']
})
export class GraphNodeMenuItemComponent implements OnInit {
  @Input() node: GraphNode;
  @ViewChild('dragElement') dragElement: ElementRef;

  constructor(public project: ProjectService) {

  }

  ngOnInit() {
  }

  addNodeToProject(event: CdkDragEnd) {
    const elem = (this.dragElement.nativeElement as HTMLElement);
    const node = CopyMachine.copy(this.node);
    const box = elem.getBoundingClientRect();

    const workspace = document.getElementById('workspace');
    const box2 = workspace.getBoundingClientRect();

    node.position = { x: box.left - box2.left + box.width / 2, y: box.top - box2.top + box.height / 2 };
    event.source._dragRef.reset();

    if (box.left < box2.left || box.top < box2.top) { return; }

    this.project.nodes.push(node);
  }
}
