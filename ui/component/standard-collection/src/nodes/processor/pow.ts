import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, ExecutionRequestInfo } from "node-structure";

export const pow: GraphNodeDefinition = {

    definition: {
        name: "Power",
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
