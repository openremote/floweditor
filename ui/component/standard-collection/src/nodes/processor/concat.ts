import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType, ExecutionRequestInfo } from "node-structure";

export const concat: GraphNodeDefinition = {

    definition: {
        name: "Concatenation",
        type: GraphNodeType.Processor,
        inputs: [
            {
                name: "a",
                type: GraphDataTypes.String
            },
            {
                name: "b",
                type: GraphDataTypes.String
            }
        ],
        outputs: [
            {
                name: "c",
                type: GraphDataTypes.String
            }
        ],
        internals: []
    },

    implementation: {
        execute(info) {
            return info.internals[0].value;
        }
    }
};
