import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { CopyMachine } from 'src/app/logic/copy.machine';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Node } from '@openremote/model';
import { InputService } from 'src/app/services/input.service';

@Component({
  selector: 'app-graph-node-menu-item',
  templateUrl: './graph-node-menu-item.component.html',
  styleUrls: ['./graph-node-menu-item.component.css']
})
export class GraphNodeMenuItemComponent implements AfterViewInit {
  @Input() node: Node;
  @ViewChild('dragElement') dragElement: ElementRef<HTMLElement>;
  isDragging = false;

  oX = 0;
  oY = 0;

  fX = 0;
  fY = 0;

  updatePos = (me: MouseEvent) => {
    this.fX = me.clientX - this.oX;
    this.fY = me.clientY - this.oY;
  }

  constructor(public project: ProjectService, private dialog: MatDialog) { }

  ngAfterViewInit() {

  }

  startDrag(e: MouseEvent) {
    this.oX = e.offsetX;
    this.oY = e.offsetY;

    window.addEventListener('mousemove', this.updatePos, false);
    window.addEventListener('mouseup', (me) => {
      this.addNodeToProject(me);
      window.removeEventListener('mousemove', this.updatePos);
      this.isDragging = false;
    }, false);

    this.updatePos(e);
    this.isDragging = true;
  }

  addNodeToProject(event: MouseEvent) {
    if (!this.isDragging) { return; }

    const elem = this.dragElement.nativeElement;
    const node = CopyMachine.copy(this.node);
    const box = elem.getBoundingClientRect();

    const workspace = document.getElementById('workspace');
    const box2 = workspace.getBoundingClientRect();

    node.position = { x: box.left - box2.left + box.width / 2, y: box.top - box2.top + box.height / 2 };

    if (box.left < box2.left || box.top < box2.top) { return; }

    try {
      this.project.addNode(node);
    } catch (error) {
      this.dialog.open(ErrorDialogComponent, { data: (error as Error).message });
    }
  }
}
