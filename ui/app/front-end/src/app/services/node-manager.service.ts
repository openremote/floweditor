import { Injectable } from '@angular/core';
import { Node } from '@openremote/model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  public nodes: Node[] = [];
  constructor(private rest: RestService) {

  }

  public downloadNodeDefinitions(callback: (nodes: Node[]) => void) {
    this.rest.getFlowResource().then(flow => {
      flow.getAllNodeDefinitions().then(n => {
        n.data.forEach(node => {
          this.nodes.push(node);
        });
        callback(this.nodes);
      });
    });
  }
}
