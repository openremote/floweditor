import { GraphNode } from '../models/graph.node';
import { IdentityAssigner } from './identity.assigner';
import { GraphSocket } from '../models/graph.socket';

export class CopyMachine {
    public static copy(node: GraphNode): GraphNode {
        let minimalNode = new GraphNode();

        minimalNode.inputs = node.inputs.map(i => new GraphSocket(i.name, i.type));
        minimalNode.internals = node.internals;
        minimalNode.name = node.name;
        minimalNode.outputs = node.outputs.map(i => new GraphSocket(i.name, i.type));
        minimalNode.type = node.type;

        console.log(minimalNode);

        const clone: GraphNode = JSON.parse(JSON.stringify(minimalNode));
        clone.id = IdentityAssigner.generateIdentity();
        clone.inputs.forEach(socket => {
            socket.node = clone;
        });

        clone.outputs.forEach(socket => {
            socket.node = clone;
        });

        return clone;
    }
}