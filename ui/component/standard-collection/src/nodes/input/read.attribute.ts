import { RuleCondition, PickerType, NodePair, NodeType, NodeDataType } from "@openremote/model";

export const readAttribute: NodePair = {

    definition: {
        name: "Read attribute",
        type: NodeType.INPUT,
        outputs: [
            {
                name: "value",
                type: NodeDataType.ANY,
            },
        ],
        inputs: [],
        internals: [
            {
                name: "attribute",
                picker: {
                    type: PickerType.ASSET_ATTRIBUTE
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
