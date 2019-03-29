import { Injectable } from '@angular/core';
import { GraphNode } from '../models/graphnode';
import { Connection } from '../models/Connection';
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
    if (this.isDragging) return;

    this.currentFrom = socket;
    this.currentFromElement = event.toElement;
    this.isDragging = true;
  }

  public stopConnectionDrag(socket: GraphSocket, event: MouseEvent) {
    if (!this.isDragging) return;

    this.isDragging = false;

    let existing = this.connections.find(c => c.from == this.currentFrom || c.to == socket);
    if (existing)
      this.connections.splice(this.connections.indexOf(existing), 1);

    this.connections.push(new Connection(this.currentFrom, socket, this.currentFromElement, event.toElement));
  }
}
