import { ServerReadyInternal } from './ServerReadyInternal';
import { GraphNode } from '../graphnode';
export class ServerReadyNode {
    public type: string;
    public id: number;
    public internals: ServerReadyInternal[] = [];

    constructor(node: GraphNode) {
        this.type = node.type.toString();
        this.id = node.id;
        node.internals.forEach(internal => {
            const srInternal: ServerReadyInternal = new ServerReadyInternal();
            srInternal.name = internal.name;
            srInternal.value = internal.value;
            this.internals.push(srInternal);
        });
    }
}
