import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { SelectionService } from './selection.service';
import { SocketTypeMatcher } from '../logic/socket.type.matcher';
import { Connection, GraphNode, GraphSocket, GraphNodeType } from 'node-structure';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public nodes: GraphNode[] = [];
  public connections: Connection[] = [];

  public isDragging: boolean;
  private currentFrom: GraphSocket;
  private currentFromElement: Element;

  private reverseConnection = false;

  constructor(private input: InputService, private selection: SelectionService) {
    input.registerCallback((s) => this.keyDown(s));
    selection.nodes = this.nodes;
  }

  private keyDown(key: string) {
    if (this.input.focusInputCount > 0) { return; }

    if (key === 'Delete' || key === 'Backspace') {
      this.removeSelectedNodes();
    }
  }

  public removeSelectedNodes() {
    this.selection.selectedNodes.forEach((n) => {
      this.removeNode(n);
    });
  }

  public addNode(node: GraphNode) {
    if (node.type === GraphNodeType.Then) {
      if (this.nodes.find((n) => n.type === GraphNodeType.Then) != null) {
        throw new Error('A project can only have one THEN node');
      }
    }
    this.nodes.push(node);
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

  public removeConnection(connection: Connection) {
    this.connections.splice(this.connections.indexOf(connection), 1);
  }

  public connectionDrag(socket: GraphSocket, event: MouseEvent) {
    if (this.isDragging) {
      this.stopConnectionDrag(socket, event);
    } else {
      this.beginConnectionDrag(socket, event);
    }
  }

  public beginConnectionDrag(socket: GraphSocket, event: MouseEvent, reversed: boolean = false) {
    if (this.isDragging) { return; }
    this.reverseConnection = reversed;

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


    const source = this.reverseConnection ? socket : this.currentFrom;
    const destination = this.reverseConnection ? this.currentFrom : socket;

    const sourceElement = this.reverseConnection ? this.currentFromElement : event.target as Element;
    const destinationElement = this.reverseConnection ? event.target as Element : this.currentFromElement;

    const existing = this.connections.filter((c) => c.to === destination);

    if (sourceElement.getAttribute('socket') === destinationElement.getAttribute('socket')) { return; }

    if (!SocketTypeMatcher.match(source.type, destination.type)) { return; }

    existing.forEach(connection => {
      this.connections.splice(this.connections.indexOf(connection), 1);
    });

    this.connections.push(new Connection(source, destination, sourceElement, destinationElement));
  }
}
