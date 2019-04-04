import { Injectable } from '@angular/core';
import { GraphNode } from '../models/graph.node';
import { Connection } from '../models/connection';
import { GraphSocket } from '../models/graph.socket';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public nodes: GraphNode[] = [];
  public connections: Connection[] = [];

  public isDragging: boolean;
  private currentFrom: GraphSocket;
  private currentFromElement: Element;

  constructor() { }
  public beginConnectionDrag(socket: GraphSocket, event: MouseEvent) {
    if (this.isDragging) { return; }

    this.currentFrom = socket;
    this.currentFromElement = event.target as Element;
    this.isDragging = true;
  }

  public isValidNodeStructure(): boolean {
    return false;
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

    existing.forEach(connection => {
      this.connections.splice(this.connections.indexOf(connection), 1);
    });

    this.connections.push(new Connection(this.currentFrom, socket, this.currentFromElement, event.target as Element));
  }
}
