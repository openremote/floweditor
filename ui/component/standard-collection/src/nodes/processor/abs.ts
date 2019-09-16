import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType, ExecutionRequestInfo } from "node-structure";

export const abs: GraphNodeDefinition = {

    definition: {
        name: "Absolute",
        type: GraphNodeType.Processor,
        inputs: [
            {
                name: "v",
                type: GraphDataTypes.Number
            }
        ],
        outputs: [
            {
                name: "x",
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
