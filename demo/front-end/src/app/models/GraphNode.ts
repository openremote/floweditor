import { GraphNodeType } from './graphnodetype';
import { GraphSocket } from './graphsocket';
import { GraphInternal } from './graphinternal';
declare var UUID : any;

export class GraphNode {

    public static count : number = 0;

    public id: number;
    public inputs: GraphSocket[] = [];
    public outputs: GraphSocket[] = [];
    public internals: GraphInternal[] = [];
    public name: string;
    public type: GraphNodeType;

    getClone(): GraphNode {
        let clone : GraphNode = JSON.parse(JSON.stringify(this));
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
