import { RuleActionWriteAttribute, PickerType, NodePair, NodeType, NodeDataType } from "@openremote/model";

export const writeAttribute: NodePair = {

    definition: {
        name: "Write attribute",
        type: NodeType.OUTPUT,
        inputs: [
            // {
            //     name: "trigger",
            //     type: GraphDataTypes.Trigger,
            // },
            {
                name: "value",
                type: NodeDataType.ANY,
            },
        ],
        outputs: [],
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

            const inputValue = info.translator.executeNode(info.inputs[0], info.collection);

            const action: RuleActionWriteAttribute = {
                action: "write-attribute",
                attributeName: info.internals[0].value.attributeName,
                value: inputValue, // TODO get implementation from connected socket
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
