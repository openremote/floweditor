import { GraphNodeCollection, GraphNode, GraphNodeImplementation, GraphSocket, GraphNodeType, GraphDataTypes } from "./models";
import { JsonRule, RuleCondition, RuleActionUnion, Ruleset, JsonRulesetDefinition } from "@openremote/model";
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

    public getInputConnections(node: GraphNode, collection: GraphNodeCollection): GraphSocket[] {
        const result: GraphSocket[] = [];

        for (const socket of node.inputs) {
            const connected = collection.connections.filter((c) => c.to === socket)[0];
            result.push(connected ? connected.from : null);
        }

        return result;
    }

    public getOutputConnections(node: GraphNode, collection: GraphNodeCollection): GraphSocket[][] {
        const result: GraphSocket[][] = [];

        for (const socket of node.outputs) {
            const connected = collection.connections.filter((c) => c.from === socket).map((c) => c.to);
            result.push(connected);
        }

        return result;
    }

    public executeNode(socket: GraphSocket, collection: GraphNodeCollection) {
        const impl = this.getImplementation(socket.node.name);
        const index = socket.node.outputs.indexOf(socket);

        return impl.execute(
            {
                outputSocketIndex: index,
                outputSocket: socket,
                inputs: this.getInputConnections(socket.node, collection),
                outputs: this.getOutputConnections(socket.node, collection),
                internals: socket.node.internals,
                node: socket.node,
                collection: collection
            }
        );
    }

    public translate(name: string, description: string, collection: GraphNodeCollection): string {
        if (collection.nodes.filter((n) => n.type === GraphNodeType.Then).length !== 0) {
            throw new Error("THEN nodes are no longer allowed");
        }

        const outputs = collection.nodes.filter((n) => n.type === GraphNodeType.Output);
        const ruleset: JsonRulesetDefinition = { rules: [] };

        for (const output of outputs) {
            const rule: JsonRule = {
                name,
                description
            };

            // somehow seperate the condtion and action parts from the resulting array of nodes

            ruleset.rules.push(rule);
        }

        return JSON.stringify(ruleset, null, 2);
    }
}
