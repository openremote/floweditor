import { GraphNode, GraphNodeCollection, GraphSocket, ServerReadyInternal, Picker } from "./models";
import { ServerReadyNodeCollection, ServerReadyConnection, ServerReadyNode, ServerReadySocket } from "./server.ready.models";

export class NodeUtilities {
    public static getInputConnections(node: GraphNode, collection: GraphNodeCollection): GraphSocket[] {
        const result: GraphSocket[] = [];

        for (const socket of node.inputs) {
            const connected = collection.connections.filter((c) => c.to === socket)[0];
            result.push(connected ? connected.from : null);
        }

        return result;
    }

    public static getOutputConnections(node: GraphNode, collection: GraphNodeCollection): GraphSocket[][] {
        const result: GraphSocket[][] = [];

        for (const socket of node.outputs) {
            const connected = collection.connections.filter((c) => c.from === socket).map((c) => c.to);
            result.push(connected);
        }

        return result;
    }

    public static getNodeFromID(id: number, collection: GraphNodeCollection) {
        return collection.nodes.filter((n) => n.id === id)[0];
    }

    public static convertToServerReady(name: string, description: string, collection: GraphNodeCollection) {

        const connections: ServerReadyConnection[] = [];
        const nodes: ServerReadyNode[] = [];

        collection.connections.forEach((c) => {
            const converted: ServerReadyConnection = {
                from: {
                    index: c.from.node.outputs.indexOf(c.from),
                    name: c.from.name,
                    nodeId: c.from.node.id,
                    type: c.from.type
                },
                to: {
                    index: c.to.node.inputs.indexOf(c.to),
                    name: c.to.name,
                    nodeId: c.to.node.id,
                    type: c.to.type
                },
            };
            connections.push(converted);
        });

        collection.nodes.forEach((c) => {

            const convertedInternals: ServerReadyInternal[] = [];

            c.internals.forEach((i) => {
                convertedInternals.push({
                    name: i.name,
                    value: i.value
                });
            });

            const converted: ServerReadyNode = {
                id: c.id,
                name: c.name,
                type: c.type,
                internals: convertedInternals,
                
                position: c.position,

                inputs: c.inputs.map((ii) => {
                    const ci: ServerReadySocket = {
                        nodeId: ii.node.id,
                        index: ii.node.inputs.indexOf(ii),
                        name: ii.name,
                        type: ii.type
                    };
                    return ci;
                }),

                outputs: c.outputs.map((oo) => {
                    const co: ServerReadySocket = {
                        nodeId: oo.node.id,
                        index: oo.node.outputs.indexOf(oo),
                        name: oo.name,
                        type: oo.type
                    };
                    return co;
                })
            };
            nodes.push(converted);
        });

        const serverReadyCollection: ServerReadyNodeCollection = {
            name,
            description,
            connections,
            nodes
        };

        return serverReadyCollection;
    }
}
