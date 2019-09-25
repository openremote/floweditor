import { PickerType, NodeDataType, NodePair, NodeType } from "@openremote/model";

export const numberInput: NodePair = {

    definition: {
        name: "Number",
        type: NodeType.INPUT,
        inputs: [],
        outputs: [
            {
                name: "value",
                type: NodeDataType.NUMBER
            }
        ],
        internals: [
            {
                name: "value",
                picker: {
                    type: PickerType.NUMBER
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
