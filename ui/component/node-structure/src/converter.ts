import { GraphNodeCollection, GraphNode, GraphNodeImplementation, GraphSocket } from "./models";
import { JsonRule } from "@openremote/model";
export class NodeGraphTranslator {

    private implementations: { [name: string]: GraphNodeImplementation; } = {};
    private nodes: GraphNode[] = [];

    public registerNode(node: GraphNode, implementation: GraphNodeImplementation) {
        if (this.hasNode(node.name)) {
            throw new Error(`Attempt to register registered node ${node.name}`);
        }
        this.nodes.push(node);
        this.implementations[node.name] = implementation;
        console.log("node registered: " + JSON.stringify(node, null, 2));
    }

    public deregisterNode(node: GraphNode) {
        if (!this.hasNode(node.name)) {
            throw new Error(`Attempt to deregister unregistered node: ${node.name}`);
        }
        this.nodes.splice(this.nodes.indexOf(node), 1);
        this.implementations[node.name] = null;
        console.warn("node deregistered: " + node.name);
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

        const getInputConnections = (node: GraphNode): GraphSocket[] => {
            const result: GraphSocket[] = [];

            for (const socket of node.inputs) {
                const connected = collection.connections.filter((c) => c.to === socket)[0];
                result.push(connected ? connected.from : null);
            }

            return result;
        };

        const getOutputConnections = (node: GraphNode): GraphSocket[][] => {
            const result: GraphSocket[][] = [];

            for (const socket of node.outputs) {
                const connected = collection.connections.filter((c) => c.from === socket).map((c) => c.to);
                result.push(connected);
            }

            return result;
        };

        let r = "";
        // console.log(this.implementations);
        for (const i of collection.nodes) {
            console.log("START " + i.name);
            console.log("input connections");
            for (const connection of getInputConnections(i)) {
                console.log(connection);
            }
            console.log("output connections");
            for (const connection of getOutputConnections(i)) {
                console.log(connection);
            }
            console.log("END " + i.name);
            // r += JSON.stringify(impl.toJson(null, null, null)) + "\n";
        }

        return r;
    }
}
