import { NodeGraphTranslator } from "node-structure";
import { GraphNodeType, GraphDataTypes, PickerType, GraphInternal, GraphNode } from "node-structure/src/models";
import { nodeDefinitions } from "./generated.node.definitions"

export class StandardCollection {
    public static create() {

        const translator = new NodeGraphTranslator();

        for (const node of nodeDefinitions) {
            translator.registerNode(
                node.definition,
                node.implementation
            );
        }

        return translator;
    }
}
