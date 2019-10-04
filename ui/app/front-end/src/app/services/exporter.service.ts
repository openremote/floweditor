import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { RestService } from './rest.service';
import { NodeManagerService } from './node-manager.service';
import { NodeUtilities } from 'node-structure';
import { NodeCollection } from '@openremote/model';

@Injectable({
  providedIn: 'root'
})
export class ExporterService {

  constructor(
    private project: ProjectService,
    private nodeService: NodeManagerService) { }

  public export(name: string, description: string, callback: (data: string) => void) {
    const collection: NodeCollection = {
      name,
      description,
      nodes: this.project.nodes,
      connections: this.project.connections
    };
    callback(JSON.stringify(collection, null, 2));
  }
}
