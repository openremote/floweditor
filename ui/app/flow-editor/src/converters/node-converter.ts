import { ComplexAttributeConverter } from "lit-element";
import { Node } from "@openremote/model";
import { project } from "../components/main-application";

export const nodeConverter: ComplexAttributeConverter<unknown, unknown> = {
    fromAttribute: (value: string) => {
        return project.nodes.find((n) => n.id === value);
    },

    toAttribute: (node: Node) => {
        return node.id;
    },
};
