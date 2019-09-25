import { PickerType, NodePair, NodeType, NodeDataType } from "@openremote/model";

export const textInput: NodePair = {
    definition: {
        name: "Text",
        type: NodeType.INPUT,
        inputs: [],
        outputs: [
            {
                name: "value",
                type: NodeDataType.STRING
            }
        ],
        internals: [
            {
                name: "value",
                picker: {
                    type: PickerType.MULTILINE
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
