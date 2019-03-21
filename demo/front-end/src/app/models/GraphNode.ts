import { GraphNodeType } from './GraphNodeType';
import { GraphSocket } from './GraphSocket';

export class GraphNode {

    public inputs : GraphSocket[] = [];
    public outputs : GraphSocket[] = [];

    constructor(public name: string, public type: GraphNodeType) {

    }
}
