import { GraphNodeType } from './GraphNodeType';
import { GraphSocket } from './GraphSocket';
import { GraphInternal } from './GraphInternal';

export class GraphNode {
    public inputs: GraphSocket[] = [];
    public outputs: GraphSocket[] = [];
    public internals: GraphInternal[] = [];

    constructor(public name: string, public type: GraphNodeType) {

    }
}