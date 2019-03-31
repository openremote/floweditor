import { Injectable } from '@angular/core';
import { GraphNode } from '../models/graphnode';
import { Connection } from '../models/connection';
import { GraphSocket } from '../models/graphsocket';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public nodes: GraphNode[] = [];
  public connections: Connection[] = [];

  private isDragging: boolean;
  private currentFrom: GraphSocket;
  private currentFromElement: Element;

  constructor() { }

  public beginConnectionDrag(socket: GraphSocket, event: MouseEvent) {
    if (this.isDragging) { return; }

    this.currentFrom = socket;
    this.currentFromElement = event.target as Element;
    this.isDragging = true;
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
