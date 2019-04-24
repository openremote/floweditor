import { Injectable } from '@angular/core';
import { GraphNode } from '../models/graph.node';
import { Connection } from '../models/connection';
import { GraphSocket } from '../models/graph.socket';
import { InputService } from './input.service';
import { SelectionService } from './selection.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public nodes: GraphNode[] = [];
  public connections: Connection[] = [];

  public isDragging: boolean;
  private currentFrom: GraphSocket;
  private currentFromElement: Element;

  constructor(private input: InputService, private selection: SelectionService) {
    input.registerCallback((s) => this.keyDown(s));
  }

  private keyDown(key: string) {
    console.log(this.selection.selectedNodes);
    if (key === 'Delete' || key === 'Backspace') {
      this.selection.selectedNodes.forEach((n) => {
        this.removeNode(n);
      });
    }
  }

  public removeNode(node: GraphNode) {
    this.selection.deselectAll();
    const id = node.id;
    const newConnections: Connection[] = [];
    this.nodes.splice(this.nodes.indexOf(node), 1);
    this.connections.forEach(c => {
      if (c.from.node !== node && c.to.node !== node) {
        newConnections.push(c);
      }
    });
    this.connections = newConnections;
  }

  public beginConnectionDrag(socket: GraphSocket, event: MouseEvent) {
    if (this.isDragging) { return; }

    this.currentFrom = socket;
    this.currentFromElement = event.target as Element;
    this.isDragging = true;
  }

  public isValidNodeStructure(): boolean {
    return true;
  }

  public getFromPosition(): { x: number, y: number } {
    if (!this.isDragging) { return { x: 0, y: 0 }; }

    return {
      x: this.currentFromElement.getBoundingClientRect().left + 8,
      y: this.currentFromElement.getBoundingClientRect().top + 8
    };
  }

  public cancelDrag() {
    this.isDragging = false;
  }

  public stopConnectionDrag(socket: GraphSocket, event: MouseEvent) {
    if (!this.isDragging) { return; }

    this.isDragging = false;

    const existing = this.connections.filter((c) => c.to === socket);

    // if (this.currentFrom.type !== socket.type) { return; }

    existing.forEach(connection => {
      this.connections.splice(this.connections.indexOf(connection), 1);
    });

    this.connections.push(new Connection(this.currentFrom, socket, this.currentFromElement, event.target as Element));
  }
}
