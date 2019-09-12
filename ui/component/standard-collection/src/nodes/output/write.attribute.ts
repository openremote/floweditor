import { GraphNode, GraphNodeImplementation, GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType, ExecutionRequestInfo } from "node-structure";
import { RuleAction, RuleCondition, RuleActionWriteAttribute } from "@openremote/model";

export const writeAttribute: GraphNodeDefinition = {

    definition: {
        name: "Write attribute",
        type: GraphNodeType.Output,
        inputs: [
            // {
            //     name: "trigger",
            //     type: GraphDataTypes.Trigger,
            // },
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
        execute(info) {
            if (info.internals[0].value == null) {
                throw new Error("Empty asset attribute");
            } else if ((info.internals[0].value.attributeName as string).trim().length === 0) {
                throw new Error("Invalid attribute");
            }



            const action: RuleActionWriteAttribute = {
                action: "write-attribute",
                attributeName: info.internals[0].value.attributeName,
                value: info.inputs[0].name, // TODO get implementation from connected socket
                target: {
                    assets: {
                        ids: [
                            info.internals[0].value.assetId
                        ]
                    }
                }
            };

            return action;
        }
    }
};
