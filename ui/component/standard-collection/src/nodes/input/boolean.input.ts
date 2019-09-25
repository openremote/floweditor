import { PickerType, NodePair, NodeType, NodeDataType } from "@openremote/model";

export const booleanInput: NodePair = {
    definition: {
        name: "Boolean",
        type: NodeType.INPUT,
        inputs: [],
        outputs: [
            {
                name: "value",
                type: NodeDataType.BOOLEAN
            }
        ],
        internals: [
            {
                name: "value",
                picker: {
                    type: PickerType.DROPDOWN,
                    options: [
                        {
                            name: "true",
                            value: true
                        },
                        {
                            name: "false",
                            value: false
                        },
                    ]
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
