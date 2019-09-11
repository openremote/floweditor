import { GraphNode, GraphNodeImplementation, GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType } from "node-structure";

export const readAttribute: GraphNodeDefinition = {

    definition: {
        name: "Read attribute",
        type: GraphNodeType.Input,
        outputs: [
            {
                name: "value",
                type: GraphDataTypes.Any,
            },
        ],
        inputs: [],
        internals: [
            {
                name: "attribute",
                picker: {
                    type: PickerType.AssetAttribute
                }
            }
        ]
    },

    implementation: {
        getForOutput(index, inputs, outputs, internals) {
            return "unimplemented";
        }
    }
};
