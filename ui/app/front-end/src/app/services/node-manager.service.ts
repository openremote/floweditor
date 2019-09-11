import { Injectable } from '@angular/core';
import { NodeGraphTranslator, GraphDataTypes, GraphNodeType, PickerType } from 'node-structure';
import { StandardCollection } from 'standard-collection';
import { RuleCondition } from '@openremote/model';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  public translator: NodeGraphTranslator;
  constructor() {
    this.translator = StandardCollection.create();
  }
}
