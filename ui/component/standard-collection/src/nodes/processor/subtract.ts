import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType, ExecutionRequestInfo } from "node-structure";

export const subtract: GraphNodeDefinition = {

    definition: {
        name: "Subtract",
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
