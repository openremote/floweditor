import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { GraphNode } from 'node-structure';
import { NodePosition } from '@openremote/model';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  constructor(private input: InputService) {
    window.addEventListener('mousemove', (e) => this.updateSelection(), false);
    window.addEventListener('mouseup', (e) => this.stopSelection(e), false);
  }

  public topDepthIndex = 0;
  public selectedNodes: GraphNode[] = [];
  public nodes: GraphNode[] = [];

  public isDragging = false;
  private startSelectionPos: NodePosition;

  public selectionBox: { x: number, y: number, width: number, height: number } = { x: 0, y: 0, width: 500, height: 500 };

  public isNodeSelected(node: GraphNode): boolean {
    return this.selectedNodes.includes(node);
  }

  public selectNode(node: GraphNode, multiple: boolean = false) {
    if (this.selectedNodes.includes(node)) { return; }
    if (!this.input.isKeyDown('Shift') && !multiple) { this.selectedNodes = []; }
    this.selectedNodes.push(node);
  }

  public deselectNode(node: GraphNode) {
    if (!this.selectedNodes.includes(node)) { return; }
    if (!this.input.isKeyDown('Shift')) { this.selectedNodes = []; return; }
    this.selectedNodes.splice(this.selectedNodes.indexOf(node), 1);
  }

  public deselectAll() {
    if (!this.input.isKeyDown('Shift')) {
      this.selectedNodes = [];
    }
  }

  public toggleSelect(node: GraphNode) {
    if (this.isNodeSelected(node)) {
      this.deselectNode(node);
    } else {
      this.selectNode(node);
    }
  }

  public startSelection() {
    if (this.isDragging) { return; }
    this.isDragging = true;
    this.startSelectionPos = { x: this.input.mousePos.x, y: this.input.mousePos.y };
    this.selectionBox.x = this.input.mousePos.x;
    this.selectionBox.y = this.input.mousePos.y;
    this.selectionBox.width = 0;
    this.selectionBox.height = 0;
  }

  private updateSelection() {
    if (!this.isDragging) { return; }
    const w = this.input.mousePos.x - this.startSelectionPos.x;
    const h = this.input.mousePos.y - this.startSelectionPos.y;

    if (w < 0) {
      this.selectionBox.x = this.input.mousePos.x;
      this.selectionBox.width = Math.abs(this.selectionBox.x - this.startSelectionPos.x);
    } else {
      this.selectionBox.x = this.startSelectionPos.x;
      this.selectionBox.width = Math.abs(w);
    }

    if (h < 0) {
      this.selectionBox.y = this.input.mousePos.y;
      this.selectionBox.height = Math.abs(this.selectionBox.y - this.startSelectionPos.y);
    } else {
      this.selectionBox.y = this.startSelectionPos.y;
      this.selectionBox.height = Math.abs(h);
    }

  }

  private isInsideBox(x, y, box) {
    return (x > box.x) && (x < box.x + box.width) && (y > box.y) && (y < box.y + box.height);
  }

  public stopSelection(e: MouseEvent) {
    if (e.button !== 0) { return; }
    if (!this.isDragging) { return; }
    this.isDragging = false;

    this.deselectAll();

    // console.log(this.nodes);

    // let offset = document.getElementById('workspace').getBoundingClientRect();
    console.log(this.nodes);
    // console.log(this.selectionBox);

    this.nodes.forEach(node => {
      if (this.isInsideBox(node.position.x, node.position.y, this.selectionBox)) {
        this.selectNode(node, true);
      }
    });

  }
}
