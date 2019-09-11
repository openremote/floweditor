import { GraphNode, GraphNodeImplementation, GraphNodeType, GraphDataTypes, GraphNodeDefinition } from "node-structure";

export const thenNode: GraphNodeDefinition = {

    definition: {
        name: "Then",
        type: GraphNodeType.Then,
        inputs: [
            {
                name: "Condition",
                type: GraphDataTypes.Boolean,
            }
        ],
        outputs: [
            {
                name: "Action",
                type: GraphDataTypes.Trigger
            }
        ],
        internals: []
    },

    implementation: {
        toJson(inputs, outputs, internals) {
            return "unimplemented";
        }
    }
};
