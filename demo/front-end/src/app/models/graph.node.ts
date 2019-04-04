import { GraphNodeType } from './graph.node.type';
import { GraphSocket } from './graph.socket';
import { GraphInternal } from './graph.internal';

export class GraphNode {

    public static count = 0;

    public id: number;
    public inputs: GraphSocket[] = [];
    public outputs: GraphSocket[] = [];
    public internals: GraphInternal[] = [];
    public name: string;
    public type: GraphNodeType;

    getClone(): GraphNode {
        const clone: GraphNode = JSON.parse(JSON.stringify(this));
        clone.id = GraphNode.count;
        GraphNode.count++;
        clone.inputs.forEach(socket => {
            socket.node = clone;
        });

        clone.outputs.forEach(socket => {
            socket.node = clone;
        });

        return clone;
    }
}
