import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RestService } from './rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NodeGraphTranslator, GraphNodeCollection } from 'node-structure';
import { ServerResponse } from '../models/server.response';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { NodeManagerService } from './node-manager.service';
import { NodeUtilities } from 'node-structure';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor(
    private project: ProjectService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private rest: RestService,
    private nodeService: NodeManagerService) { }

  public export(name: string, desc: string, callback: (data: string) => void) {
    const translator = this.nodeService.translator;
    const collection = new GraphNodeCollection(this.project.nodes, this.project.connections);

    const r = NodeUtilities.convertToServerReady(name, desc, collection);
    console.log(r);
    callback(JSON.stringify(r));
    /*
    try {
      const result = translator.translate(name, desc, collection);
      callback(result);
    } catch (error) {
      console.error(error);
      this.dialog.open(ErrorDialogComponent, { data: (error as Error).message });
    }*/
  }
}
