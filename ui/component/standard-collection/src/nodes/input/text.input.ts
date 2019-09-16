import { GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType } from "node-structure";
export const textInput: GraphNodeDefinition = {
    definition: {
        name: "Text",
        type: GraphNodeType.Input,
        inputs: [],
        outputs: [
            {
                name: "value",
                type: GraphDataTypes.String
            }
        ],
        internals: [
            {
                name: "value",
                picker: {
                    type: PickerType.Multiline
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
