import { GraphNode, GraphNodeImplementation, GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType } from "node-structure";

export const writeAttribute: GraphNodeDefinition = {

    definition: {
        name: "Write attribute",
        type: GraphNodeType.Output,
        inputs: [
            {
                name: "trigger",
                type: GraphDataTypes.Trigger,
            },
            {
                name: "value",
                type: GraphDataTypes.Any,
            },
        ],
        outputs: [],
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
