import { GraphDataTypes } from './graphdatatypes';
import { GraphNode } from './graphnode';

export class GraphSocket {
    public node: GraphNode;
    public connectedSocket: GraphSocket;

    constructor(public name: string, public type: GraphDataTypes) {
    }
}
