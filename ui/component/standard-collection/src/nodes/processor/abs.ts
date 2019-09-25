import { NodePair, NodeType, NodeDataType } from "@openremote/model";

export const abs: NodePair = {

    definition: {
        name: "Absolute",
        type: NodeType.PROCESSOR,
        inputs: [
            {
                name: "v",
                type: NodeDataType.NUMBER
            }
        ],
        outputs: [
            {
                name: "x",
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
