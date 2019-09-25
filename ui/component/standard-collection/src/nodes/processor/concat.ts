import { NodePair, NodeType, NodeDataType } from "@openremote/model";

export const concat: NodePair = {

    definition: {
        name: "Concatenation",
        type: NodeType.PROCESSOR,
        inputs: [
            {
                name: "a",
                type: NodeDataType.STRING
            },
            {
                name: "b",
                type: NodeDataType.STRING
            }
        ],
        outputs: [
            {
                name: "c",
                type: NodeDataType.STRING
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
