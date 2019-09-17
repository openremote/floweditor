import { GraphNode, GraphNodeCollection, GraphSocket, Connection, GraphNodeType, GraphDataTypes } from "./models";
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

    public static getNodeFromID(id: number, nodes: GraphNode[]) {
        return nodes.filter((n) => n.id === id)[0];
    }

    public static convertToNormal(collection: ServerReadyNodeCollection) {
        const nodes: GraphNode[] = [];
        const connections: Connection[] = [];

        collection.nodes.forEach((node) => {
            nodes.push({
                id: node.id,
                name: node.name,
                position: node.position,
                type: node.type as GraphNodeType,
                internals: node.internals,
                inputs: [], // These will be assigned after all nodes have been converted
                outputs: []
            });
        });

        collection.connections.forEach((connection) => {
            connections.push({
                from: {
                    name: connection.from.name,
                    node: this.getNodeFromID(connection.from.nodeId, nodes),
                    type: connection.from.type as GraphDataTypes,
                },
                to: {
                    name: connection.to.name,
                    node: this.getNodeFromID(connection.to.nodeId, nodes),
                    type: connection.to.type as GraphDataTypes,
                },
                fromElement: null,
                toElement: null
            });
        });

        for (let i = 0; i < collection.nodes.length; i++) {
            const serverNode = collection.nodes[i];
            const localNode = nodes[i];

            localNode.inputs = serverNode.inputs.map((original) => {
                const newSocket: GraphSocket = {
                    name: original.name,
                    node: this.getNodeFromID(original.nodeId, nodes),
                    type: original.type as GraphDataTypes
                };
                return newSocket;
            });
        
            localNode.outputs = serverNode.outputs.map((original) => {
                const newSocket: GraphSocket = {
                    name: original.name,
                    node: this.getNodeFromID(original.nodeId, nodes),
                    type: original.type as GraphDataTypes
                };
                return newSocket;
            });
        }

        return new GraphNodeCollection(nodes, connections);
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

            const converted: ServerReadyNode = {
                id: c.id,
                name: c.name,
                type: c.type,
                internals: c.internals,

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
