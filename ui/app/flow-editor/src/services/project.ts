import { Node, NodeConnection } from "@openremote/model";
import { CopyMachine } from "node-structure";
import { List } from "linqts";
import { LitElement, property } from "lit-element";
import { EventEmitter } from "events";

export class Project {
    public static nodes = new List<Node>();
    public static connections = new List<NodeConnection>();

    public static clear() {
        Project.nodes = new List<Node>();
        Project.connections = new List<NodeConnection>();
        Project.dispatch("cleared", null);
    }

    public static addNode(node: Node) {
        if (Project.nodes.Any((n) => n.id === node.id)) {
            throw new Error("Node with identical identity already exists in the project");
        }
        Project.nodes.Add(node);
        Project.dispatch("nodeadded", node);
    }

    public static removeNode(node: Node) {
        Project.dispatch("noderemoved", Project.nodes.Where((n) => n.id === node.id).ToArray());
        Project.nodes = Project.nodes.RemoveAll((n) => n.id === node.id);
    }

    public static subscribe(event: string, callback: (arg: any) => void) {
        this.subscribers.Add({ event, callback });
    }

    public static unsubscribe(event: string, callback: (arg: any) => void) {
        this.subscribers.Remove({ event, callback });
    }

    private static subscribers = new List<{ event: string, callback: (arg: any) => void }>();

    private static dispatch(event: string, argument: any) {
        this.subscribers.Where((e) => e.event === event).ForEach((e) => e.callback(argument));
    }
}
