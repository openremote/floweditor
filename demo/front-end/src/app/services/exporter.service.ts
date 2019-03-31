import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { MatSnackBar } from '@angular/material';
import { NodeSet } from '../models/translating/nodeset';
import { ServerReadyNode } from '../models/translating/serverreadynode';
import { ServerReadyConnection } from '../models/translating/serverreadyconnection';
import { RestService } from './rest.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor(private project: ProjectService, private snackBar: MatSnackBar, private rest: RestService) { }

  public export(callback: any) {

    const nodeSet: NodeSet = new NodeSet();
    this.project.nodes.forEach(n => {
      nodeSet.nodes.push(new ServerReadyNode(n));
    });

    this.project.connections.forEach(c => {
      nodeSet.connections.push(new ServerReadyConnection(c));
    });

    const translationObservable = this.rest.translate(nodeSet);
    translationObservable.subscribe(
      (data: string) => callback(data),
      (e: HttpErrorResponse) => {
        this.snackBar.open('Something went wrong', 'Dismiss');
        throw new Error(e.message);
      }
    );

  }
}
