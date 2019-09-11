import { GraphNode, GraphNodeImplementation, GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType } from "node-structure";

export const writeAttribute: GraphNodeDefinition = {

    definition: {
        name: "Write attribute",
        type: GraphNodeType.Output,
        inputs: [
            {
                name: "Trigger",
                type: GraphDataTypes.Trigger,
            },
            {
                name: "Value",
                type: GraphDataTypes.Any,
            },
        ],
        outputs: [],
        internals: [
            {
                name: "Attribute",
                picker: {
                    type: PickerType.AssetAttribute
                }
            }
        ]
    },

    implementation: {
        toJson(inputs, outputs, internals) {
            return "unimplemented";
        }
    }
};
