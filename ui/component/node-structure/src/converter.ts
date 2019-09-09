import { GraphNodeCollection, GraphNode, GraphNodeImplementation } from "./models";
// import { i don't know yet } from "@openremote/or-rules-editor";
export class NodeGraphTranslator {

    private implementations: { [name: string]: GraphNodeImplementation; } = {};
    private nodes: GraphNode[] = [];

    public registerNode(node: GraphNode, implementation: GraphNodeImplementation) {
        if (this.hasNode(node.name)) {
            throw new Error(`Attempt to register registered node ${node.name}`);
        }
        this.nodes.push(node);
        this.implementations[node.name] = implementation;
        console.log('node registered: ' + JSON.stringify(node, null, 2));
    }

    public deregisterNode(node: GraphNode) {
        if (!this.hasNode(node.name)) {
            throw new Error(`Attempt to deregister unregistered node: ${node.name}`);
        }
        this.nodes.splice(this.nodes.indexOf(node), 1);
        this.implementations[node.name] = null;
    }

    public hasNode(name: string) {
        return this.implementations[name] != null && this.nodes.filter((n) => n.name === name).length === 1;
    }

    public getImplementation(nodeName: string) {
        return this.implementations[nodeName];
    }

    public getNodeAt(index: number) {
        return this.nodes[index];
    }

    public getAllNodes() {
        return this.nodes.slice(0);
    }

    public translate(name: string, collection: GraphNodeCollection): string {
        return JSON.stringify(collection);
    }
}
