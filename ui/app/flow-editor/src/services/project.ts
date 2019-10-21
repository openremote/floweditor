import { Node, NodeConnection, NodeSocket } from "@openremote/model";
import { EventEmitter } from "events";
import { SocketTypeMatcher } from "node-structure";
import { asEnumerable, Range } from "ts-linq";

export class Project extends EventEmitter {
    public nodes: Node[] = [];
    public connections: NodeConnection[] = [];

    private isConnecting = false;
    private connectionStartSocket: NodeSocket;
    private connectionEndSocket: NodeSocket;

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
        this.emit("noderemoved", asEnumerable(this.nodes).Where((n) => n.id === node.id).ToArray());
        this.nodes = asEnumerable(this.nodes).Where((n) => n.id !== node.id).ToArray();
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
        if (isInputNode) {
            this.connectionEndSocket = socket;
        } else {
            this.connectionStartSocket = socket;
        }

        this.isConnecting = false;
        this.emit("connectionend", e, socket);
        this.createConnection(this.connectionStartSocket, this.connectionEndSocket);
    }

    public createConnection(fromSocket: NodeSocket, toSocket: NodeSocket): boolean {
        if (!fromSocket ||
            !toSocket) {
            return false;
        }

        if (!SocketTypeMatcher.match(fromSocket.type, toSocket.type) ||
            fromSocket.id === toSocket.id ||
            fromSocket.nodeId === toSocket.nodeId ||
            asEnumerable(this.connections).Count((c) => c.to.id === toSocket.id) > 0) {
            return false;
        }

        this.connections.push({
            from: fromSocket,
            to: toSocket
        });

        console.debug(this.connections);
        this.emit("connectioncreated", fromSocket, toSocket);
        return true;
    }
}
