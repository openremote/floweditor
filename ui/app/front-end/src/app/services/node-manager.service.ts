import { Injectable } from '@angular/core';
import { NodeGraphTranslator, GraphNode, GraphSocket, GraphDataTypes, GraphNodeType, PickerType } from 'node-structure';

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
          return '';
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
          return '';
        }
      }
    );

    // Raw json
    translator.registerNode(
      JSON.parse(`
      {
        "name": "Comparator",
        "type": "Processor",
        "internals": [
          {
            "name": "operator",
            "type": "Text",
            "picker": {
              "type": "Dropdown",
              "options": [
                {
                  "name": "more than",
                  "value": ">"
                },
                {
                  "name": "less than",
                  "value": "<"
                },
                {
                  "name": "equals",
                  "value": "=="
                }
              ]
            }
          }
        ],
        "inputs": [
          {
            "type": "Number",
            "name": "input 1"
          },
          {
            "type": "Number",
            "name": "input 2"
          }
        ],
        "outputs": [
          {
            "type": "Boolean",
            "name": "output"
          }
        ]
      }
      `),
      {
        toJson() {
          return '';
        }
      }
    );

    this.translator = translator;
  }
}
