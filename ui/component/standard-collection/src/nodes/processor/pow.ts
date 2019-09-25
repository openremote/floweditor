import { NodePair, NodeType, NodeDataType } from "@openremote/model";

export const pow: NodePair = {

    definition: {
        name: "Power",
        type: NodeType.PROCESSOR,
        inputs: [
            {
                name: "a",
                type: NodeDataType.NUMBER
            },
            {
                name: "b",
                type: NodeDataType.NUMBER
            }
        ],
        outputs: [
            {
                name: "c",
                type: NodeDataType.NUMBER
            }
        ],
        internals: []
    },

    implementation: {
        execute(info) {
            return "Unimplemented";
        }
    }
};
