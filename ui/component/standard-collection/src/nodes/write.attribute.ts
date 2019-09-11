import { GraphNode, GraphNodeImplementation, GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType } from "node-structure";
import { RuleAction, RuleCondition, RuleActionWriteAttribute } from "@openremote/model";

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
            if (internals[0].value == null) {
                throw new Error("Empty asset attribute");
            } else if ((internals[0].value.attributeName as string).trim().length === 0) {
                throw new Error("Invalid attribute");
            }



            const action: RuleActionWriteAttribute = {
                action: "write-attribute",
                attributeName: internals[0].value.attributeName,
                value: inputs[0].name, // TODO get implementation from connected socket
                target: {
                    assets: {
                        ids: [
                            internals[0].value.assetId
                        ]
                    }
                }
            };

            return action;
        }
    }
};
