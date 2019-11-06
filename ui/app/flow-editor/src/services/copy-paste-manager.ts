import { Node, NodeConnection, NodePosition } from "@openremote/model";
import { LightNodeCollection } from "../models/light-node-collection";
import { IdentityAssigner } from "node-structure";

export class CopyPasteManager {
    private clipboard: LightNodeCollection;
    private copyOrigin: NodePosition;

    public get isFull() { return !!!this.clipboard; }

    public putInClipboard(obj: LightNodeCollection, origin: NodePosition) {
        this.copyOrigin = origin;
        this.clipboard = obj;
    }

    public getFromClipboard(newOrigin: NodePosition) {
        const clone = this.cloneIsolated(this.clipboard, 0);
        const offset = {
            x: newOrigin.x - this.copyOrigin.x,
            y: newOrigin.y - this.copyOrigin.y,
        };
        clone.nodes.forEach((node) => {
            node.position.x += offset.x;
            node.position.y += offset.y;
        });
        return clone;
    }

    public cloneIsolated(obj: LightNodeCollection, positionOffset = 50) {
        const remapped: { [id: string]: string } = {};

        const clone: LightNodeCollection = JSON.parse(JSON.stringify(obj));

        clone.nodes.forEach((node: Node) => {
            const newNodeID = IdentityAssigner.generateIdentity();
            remapped[node.id] = newNodeID;
            node.position.x += positionOffset;
            node.position.y += positionOffset;
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

        clone.connections = clone.connections.filter((c) => {
            return remapped[c.from.nodeId] && remapped[c.to.nodeId];
        });

        clone.connections.forEach((connection: NodeConnection) => {
            connection.from.id = remapped[connection.from.id];
            connection.from.nodeId = remapped[connection.from.nodeId];

            connection.to.id = remapped[connection.to.id];
            connection.to.nodeId = remapped[connection.to.nodeId];
        });

        return clone;
    }
}
