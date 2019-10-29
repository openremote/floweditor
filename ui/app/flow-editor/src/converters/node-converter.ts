import { ComplexAttributeConverter } from "lit-element";
import { project } from "..";
import { Node } from "@openremote/model";

export const nodeConverter: ComplexAttributeConverter<unknown, unknown> = {
    fromAttribute: (value: string) => {
        return project.nodes.find((n) => n.id === value);
    },

    toAttribute: (node: Node) => {
        return node.id;
    },
};
