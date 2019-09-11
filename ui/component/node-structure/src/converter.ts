import { GraphNodeCollection, GraphNode, GraphNodeImplementation, GraphSocket, GraphNodeType, GraphDataTypes } from "./models";
import { JsonRule } from "@openremote/model";
export class NodeGraphTranslator {

    private implementations: { [name: string]: GraphNodeImplementation; } = {};
    private nodes: GraphNode[] = [];

    constructor(createWithTHENnode = true) {
        if (createWithTHENnode) {
            this.registerNode({
                name: "Then",
                type: GraphNodeType.Then,
                inputs: [
                    {
                        name: "Condition",
                        type: GraphDataTypes.Boolean,
                    }
                ],
                outputs: [
                    {
                        name: "Action",
                        type: GraphDataTypes.Trigger
                    }
                ],
                internals: []
            }, {
                getForOutput() {
                    return "THEN node is implemented by the converter";
                }
            });
        }
    }

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

    public translate(name: string, description: string, collection: GraphNodeCollection): string {

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

        const getImplementationResult = (socket: GraphSocket): any => {
            const impl = this.getImplementation(socket.node.name);
            const index = socket.node.outputs.indexOf(socket);

            return impl.getForOutput(
                index,
                getInputConnections(socket.node),
                getOutputConnections(socket.node),
                socket.node.internals
            );
        };

        const rule: JsonRule = {
            name,
            description
        };

        const thenNode = collection.nodes.filter((n) => n.type === GraphNodeType.Then)[0];
        if (!thenNode) { throw new Error("Missing THEN node"); }

        const lhs = getInputConnections(thenNode)[0];
        const rhs = getOutputConnections(thenNode)[0];

        if (lhs == null) { throw new Error("Empty rule condition"); }
        if (rhs.length === 0) { throw new Error("Empty rule action"); }

        rule.when = {
            items: [
                getImplementationResult(lhs)
            ]
        };

        rule.then = rhs.map((s) => getImplementationResult(s));

        return JSON.stringify({ rules: [rule] }, null, 2);
    }
}
