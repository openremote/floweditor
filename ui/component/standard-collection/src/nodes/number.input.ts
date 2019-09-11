import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType } from "node-structure";

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
        getForOutput(index, inputs, outputs, internals) {
            return internals[0].value;
        }
    }
};
