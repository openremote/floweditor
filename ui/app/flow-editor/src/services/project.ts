import { Node, NodeConnection, NodeSocket } from "@openremote/model";
import { List } from "linqts";
import { EventEmitter } from "events";

export class Project extends EventEmitter {
    public nodes = new List<Node>();
    public connections = new List<NodeConnection>();

    private isConnecting = false;
    private connectionStartSocket: NodeSocket;
    private connectionEndSocket: NodeSocket;

    public clear() {
        this.nodes = new List<Node>();
        this.connections = new List<NodeConnection>();
        this.emit("cleared");
    }

    public addNode(node: Node) {
        if (this.nodes.Any((n) => n.id === node.id)) {
            throw new Error("Node with identical identity already exists in the project");
        }
        this.nodes.Add(node);
        this.emit("nodeadded", node);
    }

    public removeNode(node: Node) {
        this.emit("noderemoved", this.nodes.Where((n) => n.id === node.id).ToArray());
        this.nodes = this.nodes.RemoveAll((n) => n.id === node.id);
    }

    public startConnectionDrag = (e: MouseEvent, socket: NodeSocket) => {
        this.isConnecting = true;
        this.emit("connectionstart", e, socket);
    }

    public connectionDragging = (e: MouseEvent) => {
        this.emit("connecting", e);
    }

    public endConnectionDrag = (e: MouseEvent, socket: NodeSocket) => {
        this.isConnecting = false;
        this.emit("connectionend", e, socket);
    }
}
