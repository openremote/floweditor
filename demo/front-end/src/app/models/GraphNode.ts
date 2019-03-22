import { GraphNodeType } from './graphnodetype';
import { GraphSocket } from './graphsocket';
import { GraphInternal } from './graphinternal';

export class GraphNode {
    public inputs: GraphSocket[] = [];
    public outputs: GraphSocket[] = [];
    public internals: GraphInternal[] = [];

    constructor(public name: string, public type: GraphNodeType) {

    }

    getClone(): GraphNode {
        const node: GraphNode = new GraphNode(this.name, this.type);
        node.inputs = this.inputs;
        node.outputs = this.outputs;
        node.internals = this.internals;
        return node;
    }
}
