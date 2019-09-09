import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NodeSet } from '../models/translating/node.set';
import { ServerReadyNode } from '../models/translating/server.ready.node';
import { ServerReadyConnection } from '../models/translating/server.ready.connection';
import { RestService } from './rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NodeGraphTranslator, GraphNodeCollection } from 'node-structure';
import { ServerResponse } from '../models/server.response';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor(private project: ProjectService, private snackBar: MatSnackBar, private dialog: MatDialog, private rest: RestService) { }

  public export(name: string, callback: (data: string) => void) {
    const translator = new NodeGraphTranslator();
    const collection = new GraphNodeCollection(this.project.nodes, this.project.connections);
    const result = translator.translate(name, collection);
    callback(result);
    return;
    const nodeSet: NodeSet = new NodeSet();

    nodeSet.name = name;

    this.project.nodes.forEach(n => {
      nodeSet.nodes.push(new ServerReadyNode(n));
    });

    this.project.connections.forEach(c => {
      nodeSet.connections.push(new ServerReadyConnection(c));
    });

    const translationObservable = this.rest.translate(nodeSet);
    translationObservable.subscribe(
      (data: ServerResponse) => {
        if (data.success) {
          callback(data.object);
        } else {
          this.dialog.open(ErrorDialogComponent, { data });
        }
      },
      (e: HttpErrorResponse) => {
        this.snackBar.open('Something went wrong', 'Dismiss');
        throw new Error(e.message);
      }
    );

  }
}
