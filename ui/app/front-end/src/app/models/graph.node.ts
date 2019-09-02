import { GraphNodeType } from './graph.node.type';
import { GraphSocket } from './graph.socket';
import { GraphInternal } from './graph.internal';

export class GraphNode {
    public id: number;
    public inputs: GraphSocket[] = [];
    public outputs: GraphSocket[] = [];
    public internals: GraphInternal[] = [];
    public name: string;
    public type: GraphNodeType;
    public position: {x: number, y: number} = {x: 0, y: 0};
}
