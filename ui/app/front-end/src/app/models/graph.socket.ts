import { GraphDataTypes } from './graph.data.types';
import { GraphNode } from './graph.node';

export class GraphSocket {
    public node: GraphNode;

    constructor(public name: string, public type: GraphDataTypes) {
    }
}
