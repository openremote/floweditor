import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType, ExecutionRequestInfo } from "node-structure";

export const numberInput: GraphNodeDefinition = {

    definition: {
        name: "Number",
        type: GraphNodeType.Input,
        inputs: [],
        outputs: [
            {
                name: "value",
                type: GraphDataTypes.Number
            }
        ],
        internals: [
            {
                name: "value",
                picker: {
                    type: PickerType.Number
                }
            }
        ]
    },

    implementation: {
        execute(info) {
            return info.internals[0].value;
        }
    }
};
