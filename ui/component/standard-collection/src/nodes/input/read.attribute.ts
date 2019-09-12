import { GraphNode, GraphNodeImplementation, GraphNodeType, GraphDataTypes, GraphNodeDefinition, PickerType } from "node-structure";
import { RuleCondition } from "@openremote/model";

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
        execute(info) {

            if (info.internals[0].value == null) {
                throw new Error("Empty asset attribute");
            } else if ((info.internals[0].value.attributeName as string).trim().length === 0) {
                throw new Error("Invalid attribute");
            }

            const condition: RuleCondition = {
                assets:
                {
                    ids: [
                        info.internals[0].value.assetId
                    ],
                    attributes: {
                        items: [
                            {
                                name: {
                                    predicateType: "string",
                                    value: info.internals[0].value.attributeName
                                },
                                exists: true
                            }
                        ]
                    }
                }
            };

            return condition;
        }
    }
};
