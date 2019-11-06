import { Node, NodeConnection } from "@openremote/model";
import { LightNodeCollection } from "../models/light-node-collection";
import { IdentityAssigner } from "node-structure";

export class CopyPasteManager {
    private clipboard: LightNodeCollection;

    public get isFull() { return !!this.clipboard; }

    public putInClipboard(obj: LightNodeCollection) {
        this.clipboard = this.cloneIsolated(obj);
    }

    public cloneIsolated(obj: LightNodeCollection) {
        const remapped: { [id: string]: string } = {};

        const clone = JSON.parse(JSON.stringify(obj));

        clone.nodes.forEach((node) => {
            const newNodeID = IdentityAssigner.generateIdentity();
            remapped[node.id] = newNodeID;

            node.id = newNodeID;
            node.inputs.forEach((input) => {
                const newSocketID = IdentityAssigner.generateIdentity();
                remapped[input.id] = newSocketID;
                input.id = newSocketID;
                input.nodeId = newNodeID;
            });
            node.outputs.forEach((output) => {
                const newSocketID = IdentityAssigner.generateIdentity();
                remapped[output.id] = newSocketID;
                output.id = newSocketID;
                output.nodeId = newNodeID;
            });
        });

        clone.connections.forEach((connection) => {
            connection.from.id = remapped[connection.from.id];
            connection.from.nodeId = remapped[connection.from.nodeId];

            connection.to.id = remapped[connection.to.id];
            connection.to.nodeId = remapped[connection.to.nodeId];
        });

        return clone;
    }
}
