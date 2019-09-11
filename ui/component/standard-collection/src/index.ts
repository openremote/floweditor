import { NodeGraphTranslator } from "node-structure";
import { GraphNodeType, GraphDataTypes, PickerType, GraphInternal, GraphNode } from "node-structure/src/models";

import { thenNode } from "./nodes/then";
import { writeAttribute } from "./nodes/write.attribute";

export class StandardCollection {
    public static create() {

        const nodes = [
            thenNode,
            writeAttribute
        ];

        const translator = new NodeGraphTranslator();

        for (const node of nodes) {
            translator.registerNode(
                node.definition,
                node.implementation
            );
        }

        return translator;
    }
}
