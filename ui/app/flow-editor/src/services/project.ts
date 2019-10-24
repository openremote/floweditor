import { Node, NodeConnection, NodeSocket } from "@openremote/model";
import { EventEmitter } from "events";
import { SocketTypeMatcher, IdentityDomLink } from "node-structure";
import { asEnumerable } from "ts-linq";
import { input } from "..";

export class Project extends EventEmitter {
    public nodes: Node[] = [];
    public connections: NodeConnection[] = [];

    private isConnecting = false;
    private connectionStartSocket: NodeSocket;
    private connectionEndSocket: NodeSocket;

    constructor() {
        super();
        this.setMaxListeners(256);
    }

    public get isCurrentlyConnecting() {
        return this.isConnecting;
    }

    public clear() {
        this.nodes = [];
        this.connections = [];
        this.emit("cleared");
    }

    public addNode(node: Node) {
        if (asEnumerable(this.nodes).Any((n) => n.id === node.id)) {
            throw new Error("Node with identical identity already exists in the project");
        }
        this.nodes.push(node);
        this.emit("nodeadded", node);
    }

    public removeNode(node: Node) {
        input.clearSelection();
        this.connections.filter((c) => c.from.nodeId === node.id || c.to.nodeId === node.id).forEach((c) => {
            this.removeConnection(c);
        });
        this.nodes.filter((n) => n.id === node.id).forEach((n) => {
            this.nodes.splice(this.nodes.indexOf(n), 1);
            // IdentityDomLink.map[n.id] = null;
            // for (const inputSocket of n.inputs) {
            //     IdentityDomLink.map[inputSocket.id] = null;
            // }
            // for (const outputSocket of n.outputs) {
            //     IdentityDomLink.map[outputSocket.id] = null;
            // }
            this.emit("noderemoved", n);
        });
    }

    public startConnectionDrag = (e: MouseEvent, socket: NodeSocket, isInputNode: boolean) => {
        this.connectionStartSocket = null;
        this.connectionEndSocket = null;

        if (isInputNode) {
            this.connectionEndSocket = socket;
        } else {
            this.connectionStartSocket = socket;
        }

        this.isConnecting = true;
        this.emit("connectionstart", e, socket);
    }

    public connectionDragging = (e: MouseEvent) => {
        this.emit("connecting", e);
    }

    public endConnectionDrag = (e: MouseEvent, socket: NodeSocket, isInputNode: boolean) => {
        if (!this.isConnecting) { return; }
        if (isInputNode) {
            this.connectionEndSocket = socket;
        } else {
            this.connectionStartSocket = socket;
        }

        this.isConnecting = false;
        this.emit("connectionend", e, socket);
        this.createConnection(this.connectionStartSocket, this.connectionEndSocket);
    }

    public removeConnection(connection: NodeConnection) {
        input.clearSelection();
        this.connections.filter((c) => c.from.id === connection.from.id && c.to.id === connection.to.id).forEach((c) => {
            const index = this.connections.indexOf(c);
            if (index === -1) {
                console.warn("attempt to delete nonexistent connection");
            } else {
                this.connections.splice(index, 1);
                this.emit("connectionremoved", c);
            }
        });
    }

    public createConnection(fromSocket: NodeSocket, toSocket: NodeSocket): boolean {
        if (!fromSocket ||
            !toSocket) {
            return false;
        }

        if (!SocketTypeMatcher.match(fromSocket.type, toSocket.type) ||
            fromSocket.id === toSocket.id ||
            fromSocket.nodeId === toSocket.nodeId) {
            return false;
        }

        for (const c of this.connections.filter((j) => j.to.id === toSocket.id)) {
            this.removeConnection(c);
        }

        this.connections.push({
            from: fromSocket,
            to: toSocket
        });

        this.emit("connectioncreated", fromSocket, toSocket);
        return true;
    }
}
