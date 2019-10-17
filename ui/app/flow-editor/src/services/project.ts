import { Node, NodeConnection } from "@openremote/model";
import { List } from "linqts";
import { EventEmitter } from "events";

export class Project extends EventEmitter {
    public nodes = new List<Node>();
    public connections = new List<NodeConnection>();

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
}
