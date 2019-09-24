import { GraphNode, GraphNodeCollection, GraphSocket, Connection, GraphNodeType, GraphDataTypes } from "./models";
import { ServerReadyNodeCollection, ServerReadyConnection, ServerReadyNode, ServerReadySocket } from "@openremote/model";

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

    public static getNodeFromID(id: string, nodes: GraphNode[]) {
        const nodeIndex = nodes.findIndex((n) => n.id === id);
        if (nodeIndex === -1) { console.warn(`Node wiht ID ${id} not found`); }
        return nodes[nodeIndex];
    }

    public static convertToNormal(collection: ServerReadyNodeCollection) {
        const nodes: GraphNode[] = [];
        const sockets: GraphSocket[] = [];
        const connections: Connection[] = [];

        collection.nodes.forEach((node) => {
            nodes.push({
                id: node.id,
                name: node.name,
                position: node.position,
                type: node.type as GraphNodeType,
                internals: node.internals,
                inputs: [], // These will be populated after all nodes have been converted
                outputs: []
            });
        });

        for (let i = 0; i < collection.nodes.length; i++) {
            const serverNode = collection.nodes[i];

            nodes[i].inputs = serverNode.inputs.map((original) => {
                const newSocket: GraphSocket = {
                    name: original.name,
                    node: nodes[i],
                    type: original.type as GraphDataTypes,
                    id: original.id,
                };
                sockets.push(newSocket);
                return newSocket;
            });

            nodes[i].outputs = serverNode.outputs.map((original) => {
                const newSocket: GraphSocket = {
                    name: original.name,
                    node: nodes[i],
                    type: original.type as GraphDataTypes,
                    id: original.id,
                };
                sockets.push(newSocket);
                return newSocket;
            });
        }

        collection.connections.forEach((connection) => {
            connections.push({
                from: sockets.find((s) => s.id === connection.from.id),
                to: sockets.find((s) => s.id === connection.to.id)
            });
        });

        connections.forEach((conn) => {
            if (!conn.to.node.inputs.includes(conn.to)) {
                console.warn(`Incorrect inputs node refernces`);
            }
            if (!conn.from.node.outputs.includes(conn.from)) {
                console.warn(`Incorrect output node refernces`);
            }
        });

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
                    type: c.from.type,
                    id: c.from.id,
                },
                to: {
                    index: c.to.node.inputs.indexOf(c.to),
                    name: c.to.name,
                    nodeId: c.to.node.id,
                    type: c.to.type,
                    id: c.to.id,
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
                        nodeId: c.id,
                        index: c.inputs.indexOf(ii),
                        name: ii.name,
                        type: ii.type,
                        id: ii.id,
                    };
                    return ci;
                }),

                outputs: c.outputs.map((oo) => {
                    const co: ServerReadySocket = {
                        nodeId: c.id,
                        index: c.outputs.indexOf(oo),
                        name: oo.name,
                        type: oo.type,
                        id: oo.id,
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
