import { GraphNode } from '../models/graph.node';
import { IdentityAssigner } from './identity.assigner';

export class CopyMachine {
    public static copy(node: GraphNode): GraphNode {
        const clone: GraphNode = JSON.parse(JSON.stringify(node));
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