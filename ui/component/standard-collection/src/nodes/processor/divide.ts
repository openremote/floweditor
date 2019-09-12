import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType, ExecutionRequestInfo } from "node-structure";

export const divide: GraphNodeDefinition = {

    definition: {
        name: "Divide",
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
            return info.internals[0].value;
        }
    }
};
