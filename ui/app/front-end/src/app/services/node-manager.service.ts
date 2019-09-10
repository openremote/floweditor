import { Injectable } from '@angular/core';
import { NodeGraphTranslator, GraphNode, GraphSocket, GraphDataTypes, GraphNodeType, PickerType } from 'node-structure';
import { RuleCondition } from '@openremote/model';

@Injectable({
  providedIn: 'root'
})
export class NodeManagerService {
  public translator: NodeGraphTranslator;
  constructor() {
    const translator = new NodeGraphTranslator();

    translator.registerNode(
      {
        name: 'Attribute',
        type: 'Input' as GraphNodeType,
        outputs: [
          {
            name: 'value',
            type: 'Any' as GraphDataTypes
          }
        ],
        inputs: [],
        internals: [
          {
            picker: {
              type: 'AssetAttribute' as PickerType,
              options: []
            },
            name: 'Attribute'
          }
        ]
      },
      {
        toJson() {
          const c: RuleCondition = {
            assets: {

            }
          };
          return c;
        }
      }
    );

    // testing stuff
    translator.registerNode(
      {
        name: 'Number',
        type: 'Input' as GraphNodeType,
        internals: [
          {
            name: 'number',
            picker: {
              name: 'Number',
              type: 'Number' as PickerType,
              options: []
            }
          }
        ],
        inputs: [],
        outputs: [
          {
            type: 'Number' as GraphDataTypes,
            name: 'value'
          }
        ]
      },
      {
        toJson() {
          const c: RuleCondition = {
            assets: {

            }
          };
          return c;
        }
      }
    );

    translator.registerNode(
      {
        name: 'Just a processor',
        type: 'Processor' as GraphNodeType,
        internals: [],
        inputs: [
          {
            type: 'Any' as GraphDataTypes,
            name: 'test'
          },
          {
            type: 'Number' as GraphDataTypes,
            name: 'test2'
          }
        ],
        outputs: [
          {
            type: 'Any' as GraphDataTypes,
            name: 'questionable'
          },
          {
            type: 'Any' as GraphDataTypes,
            name: 'certain'
          }
        ]
      },
      {
        toJson() {
          const c: RuleCondition = {
            assets: {

            }
          };
          return c;
        }
      }
    );

    translator.registerNode(
      {
        name: 'Then',
        type: 'Then' as GraphNodeType,
        internals: [],
        inputs: [
          {
            type: 'Boolean' as GraphDataTypes,
            name: 'condition'
          }
        ],
        outputs: [
          {
            type: 'Trigger' as GraphDataTypes,
            name: 'action'
          }
        ]
      },
      {
        toJson() {
          const c: RuleCondition = {
            assets: {

            }
          };
          return c;
        }
      }
    );

    translator.registerNode(
      {
        name: 'Write attribute',
        type: 'Output' as GraphNodeType,
        internals: [],
        inputs: [
          {
            type: 'Trigger' as GraphDataTypes,
            name: 'trigger'
          },
          {
            type: 'Any' as GraphDataTypes,
            name: 'value'
          }
        ],
        outputs: []
      },
      {
        toJson(inputs, outputs, internals) {
          return inputs[1].name;
        }
      }
    );

    this.translator = translator;
  }
}
