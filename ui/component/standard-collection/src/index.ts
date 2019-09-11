import { NodeGraphTranslator } from "node-structure";
import { GraphNodeType, GraphDataTypes, PickerType, GraphInternal, GraphNode } from "node-structure/src/models";

import { writeAttribute } from "./nodes/write.attribute";
import { readAttribute } from "./nodes/read.attribute";
import { numberInput } from "./nodes/number.input";
import { textInput } from "./nodes/text.input";
import { booleanInput } from "./nodes/boolean.input";

export class StandardCollection {
    public static create() {

        const nodes = [
            writeAttribute,
            readAttribute,
            numberInput,
            textInput,
            booleanInput
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
