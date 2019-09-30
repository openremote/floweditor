import { Injectable } from '@angular/core';
import { NodeGraphTranslator } from 'node-structure';
import { Node } from '@openremote/model';
import { StandardCollection } from 'standard-collection';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  public translator: NodeGraphTranslator;
  constructor(private rest: RestService) {
    this.translator = new NodeGraphTranslator();
    // Legacy node structure:
    // this.translator = StandardCollection.create();
  }

  public downloadNodeDefinitions(callback: (nodes: Node[]) => void) {
    this.rest.getFlowResource().then(flow => {
      flow.getAllNodeDefinitions().then(n => {
        n.data.forEach(node => {
          this.translator.registerNode(node, {});
        });
        callback(this.translator.getAllNodes());
      });
    });
  }
}
