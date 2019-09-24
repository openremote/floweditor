import { Injectable } from '@angular/core';
import { NodeGraphTranslator } from 'node-structure';
import { StandardCollection } from 'standard-collection';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  public translator: NodeGraphTranslator;
  constructor() {
    this.translator = StandardCollection.create();
  }
}
