import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { CopyMachine } from 'src/app/logic/copy.machine';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Node } from '@openremote/model';

@Component({
  selector: 'app-graph-node-menu-item',
  templateUrl: './graph-node-menu-item.component.html',
  styleUrls: ['./graph-node-menu-item.component.css']
})
export class GraphNodeMenuItemComponent implements OnInit {
  @Input() node: Node;
  @ViewChild('dragElement') dragElement: ElementRef;

  constructor(public project: ProjectService, private dialog: MatDialog) {

  }

  ngOnInit() {
  }

  addNodeToProject(event: CdkDragEnd) {

    console.log(this.node);

    const elem = (this.dragElement.nativeElement as HTMLElement);
    const node = CopyMachine.copy(this.node);
    const box = elem.getBoundingClientRect();

    const workspace = document.getElementById('workspace');
    const box2 = workspace.getBoundingClientRect();

    node.position = { x: box.left - box2.left + box.width / 2, y: box.top - box2.top + box.height / 2 };
    event.source._dragRef.reset();

    if (box.left < box2.left || box.top < box2.top) { return; }

    try {
      this.project.addNode(node);
    } catch (error) {
      this.dialog.open(ErrorDialogComponent, { data: (error as Error).message });
    }
  }
}
