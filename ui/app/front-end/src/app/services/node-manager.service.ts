import { Injectable } from '@angular/core';
import { NodeGraphTranslator } from 'node-structure';
import { IntegrationService } from './integration.service';
import { Node } from '@openremote/model';
import { StandardCollection } from 'standard-collection';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  public translator: NodeGraphTranslator;
  constructor(private integration: IntegrationService) {
    this.translator = new NodeGraphTranslator();
    // Remove asap
    this.translator = StandardCollection.create();
  }

  public downloadNodeDefinitions(callback: (nodes: Node[]) => void) {
    this.integration.getInitialisationCallback(
      () => {
        this.integration.getFlowResource().getAllNodeDefinitions().then((n) => {
          n.data.forEach(node => {
            this.translator.registerNode(node, {});
          });
          callback(this.translator.getAllNodes());
        });
      }
    );
  }
}
