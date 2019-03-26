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
        return JSON.parse(JSON.stringify(this));
    }
}
