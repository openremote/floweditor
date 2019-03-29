import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { MatSnackBar } from '@angular/material';
import { NodeSet } from '../models/translating/NodeSet';
import { ServerReadyNode } from '../models/translating/ServerReadyNode';
import { ServerReadyConnection } from '../models/translating/ServerReadyConnection';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor(private project: ProjectService, private snackBar: MatSnackBar) { }

  public export() {
    this.snackBar.open('Translating...', 'Dismiss');

    let nodeSet: NodeSet = new NodeSet();
    this.project.nodes.forEach(n => {
      nodeSet.nodes.push(new ServerReadyNode(n));
    });

    this.project.connections.forEach(c => {
      nodeSet.connections.push(new ServerReadyConnection(c));
    });

    console.log(JSON.stringify(nodeSet));

    this.snackBar.open('Translated', 'Dismiss');
  }
}
