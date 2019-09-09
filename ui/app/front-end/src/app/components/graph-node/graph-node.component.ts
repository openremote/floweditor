import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionService } from 'src/app/services/selection.service';
import { CdkDrag, CdkDragStart, CdkDragMove } from '@angular/cdk/drag-drop';
import { InputService } from 'src/app/services/input.service';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { ContextMenu } from 'src/app/models/context.menu';
import { CopyMachine } from 'src/app/logic/copy.machine';
import { GraphNode } from 'node-structure';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.css']
})
export class GraphNodeComponent implements OnInit, AfterViewInit {
  @Input() node: GraphNode;
  @ViewChild('inputSockets') inputSockets: ElementRef;
  @ViewChild('outputSockets') outputSockets: ElementRef;
  @ViewChild('view') view: ElementRef;


  constructor(
    public project: ProjectService,
    public selection: SelectionService,
    private input: InputService,
    private context: ContextMenuService
  ) {

  }

  ngOnInit() {

  }

  private toTop() {
    const elem = this.view.nativeElement as HTMLElement;
    this.selection.topDepthIndex++;
    elem.style.zIndex = this.selection.topDepthIndex.toString();
  }

  ngAfterViewInit() {
    if (this.node.position != null) {
      const elem = this.view.nativeElement as HTMLElement;
      const box = elem.getBoundingClientRect();

      let x = this.node.position.x - box.width / 2;
      let y = this.node.position.y - box.height / 2;

      x = Math.max(0, x);
      y = Math.max(0, y);

      elem.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      this.updatePosition();
    }
    this.toTop();
  }

  updatePosition() {
    const elem = this.view.nativeElement as HTMLElement;
    const box = elem.getBoundingClientRect();

    const x = box.left + box.width / 2;
    const y = box.top + box.height / 2;

    this.node.position.x = Math.max(0, x);
    this.node.position.y = Math.max(0, y);
  }

  mousedown(e: MouseEvent) {
    e.stopPropagation();

    if (e.button !== 0) { return; }

    this.toTop();
    this.selection.toggleSelect(this.node);
  }

  contextMenu(event: MouseEvent) {
    event.preventDefault();
    this.selection.selectNode(this.node, this.selection.selectedNodes.length > 1);
    this.context.contextMenu = new ContextMenu();
    this.context.contextMenu.items.push(
      {
        label: 'Delete',
        action: () => { this.project.removeSelectedNodes(); }
      }
    );
    this.context.contextMenu.items.push(
      {
        label: 'Duplicate',
        action: () => {

          const copies: GraphNode[] = [];

          this.selection.selectedNodes.forEach((e) => {
            const copy = CopyMachine.copy(e);
            copy.position.x = e.position.x;
            copy.position.y = e.position.y;
            copies.push(copy);
          });

          copies.forEach((c) => {
            this.project.nodes.push(c);
          });

        }
      }
    );
    this.context.openMenu();
  }
}
