import { Injectable } from '@angular/core';
import { GraphNode } from '../models/graph.node';
import { InputService } from './input.service';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  public selectedNodes: GraphNode[] = [];

  constructor(private input: InputService) {

   }

  public isNodeSelected(node: GraphNode): boolean {
    return this.selectedNodes.includes(node);
  }

  public selectNode(node: GraphNode) {
    if (!this.input.isKeyDown('Shift')) { this.selectedNodes = []; }
    this.selectedNodes.push(node);
  }

  public deselectNode(node: GraphNode) {
    if (!this.input.isKeyDown('Shift')) { this.selectedNodes = []; return; }
    this.selectedNodes.splice(this.selectedNodes.indexOf(node), 1);
  }

  public deselectAll(){
    this.selectedNodes = [];
  }

  public toggleSelect(node: GraphNode) {
    if (this.isNodeSelected(node)) {
      this.deselectNode(node);
    } else {
      this.selectNode(node);
    }
  }
}
