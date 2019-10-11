import { Injectable } from '@angular/core';
import { InputService } from './input.service';
import { SelectionService } from './selection.service';
import { SocketTypeMatcher } from '../logic/socket.type.matcher';
import { Node, NodeSocket, NodeConnection, NodeType } from '@openremote/model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public nodes: Node[] = [];
  public connections: NodeConnection[] = [];
  public existingFlowRuleId = -1;
  public existingFlowRuleName: string = null;
  public existingFlowRuleDesc: string = null;
  public isInUnsavedState = false;

  public isDragging: boolean;
  private currentFrom: NodeSocket;
  private currentFromElement: Element;

  private reverseConnection = false;

  constructor(private input: InputService, private selection: SelectionService) {
    input.registerCallback((s) => this.keyDown(s));
    selection.nodes = this.nodes;
  }

  public setCurrentProject(id: number, name: string, desc: string) {
    this.isInUnsavedState = false;
    this.existingFlowRuleId = id;
    this.existingFlowRuleName = name;
    this.existingFlowRuleDesc = desc;
  }

  private keyDown(key: string) {
    this.isInUnsavedState = true;
    if (this.input.focusInputCount > 0) { return; }

    if (key === 'Delete' || key === 'Backspace') {
      this.removeSelectedNodes();
    }
  }

  public removeSelectedNodes() {
    this.isInUnsavedState = true;
    this.selection.selectedNodes.forEach((n) => {
      this.removeNode(n);
    });
  }

  public addNode(node: Node) {
    this.isInUnsavedState = true;
    if (node.type === NodeType.THEN) {
      if (this.nodes.find((n) => n.type === NodeType.THEN) != null) {
        throw new Error('A project can only have one THEN node');
      }
    }
    this.nodes.push(node);
  }

  public removeNode(node: Node) {
    this.isInUnsavedState = true;
    this.selection.deselectAll();
    const id = node.id;
    const newConnections: NodeConnection[] = [];
    this.nodes.splice(this.nodes.indexOf(node), 1);
    this.connections.forEach(c => {
      if (c.from.nodeId !== node.id && c.to.nodeId !== node.id) {
        newConnections.push(c);
      }
    });
    this.connections = newConnections;
  }

  public removeConnection(connection: NodeConnection) {
    this.isInUnsavedState = true;
    this.connections.splice(this.connections.indexOf(connection), 1);
  }

  public connectionDrag(socket: NodeSocket, event: MouseEvent) {
    if (this.isDragging) {
      this.stopConnectionDrag(socket, event);
    } else {
      this.beginConnectionDrag(socket, event);
    }
  }

  public beginConnectionDrag(socket: NodeSocket, event: MouseEvent, reversed: boolean = false) {
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

  public forceRemoveInvalidConnections() {
    const copy = this.connections;
    for (const c of copy) {
      if (!this.isValidConnection(c)) {
        this.connections.splice(this.connections.indexOf(c), 1);
      }
    }
  }

  public isValidConnection(c: NodeConnection) {
    // if (!this.connections.includes(c)) { return false; }
    if (c.from.id === c.to.id) { return false; }
    if (c.from.nodeId === c.to.nodeId) { return false; }
    if (!SocketTypeMatcher.match(c.from.type, c.to.type)) { return false; }

    const existing = this.connections.filter((cc) => cc.to.id === c.to.id);
    if (existing.length > 1) { return false; }

    return true;
  }

  public stopConnectionDrag(socket: NodeSocket, event: MouseEvent) {
    if (!this.isDragging) { return; }

    this.isDragging = false;
    this.isInUnsavedState = true;

    const source = this.reverseConnection ? socket : this.currentFrom;
    const destination = this.reverseConnection ? this.currentFrom : socket;

    const sourceElement = this.reverseConnection ? this.currentFromElement : event.target as Element;
    const destinationElement = this.reverseConnection ? event.target as Element : this.currentFromElement;

    const existing = this.connections.filter((c) => c.to.id === destination.id);

    if (sourceElement.getAttribute('socket') === destinationElement.getAttribute('socket')) { return; }

    if (!SocketTypeMatcher.match(source.type, destination.type)) { return; }

    existing.forEach(connection => {
      this.connections.splice(this.connections.indexOf(connection), 1);
    });

    this.connections.push({
      from: source,
      to: destination
    });
  }
}
