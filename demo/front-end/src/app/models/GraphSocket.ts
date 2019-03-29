import { GraphDataTypes } from './graphdatatypes';
import { GraphNode } from './graphnode';

export class GraphSocket {
    public node: GraphNode;

    constructor(public name: string, public type: GraphDataTypes) {
    }
}
