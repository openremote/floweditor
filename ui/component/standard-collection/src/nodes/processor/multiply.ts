import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, ExecutionRequestInfo } from "node-structure";

export const multiply: GraphNodeDefinition = {

    definition: {
        name: "Multiply",
        type: GraphNodeType.Processor,
        inputs: [
            {
                name: "a",
                type: GraphDataTypes.Number
            },
            {
                name: "b",
                type: GraphDataTypes.Number
            }
        ],
        outputs: [
            {
                name: "c",
                type: GraphDataTypes.Number
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
