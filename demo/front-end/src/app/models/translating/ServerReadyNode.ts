import { ServerReadyInternal } from './serverreadyinternal';
import { GraphNode } from '../graphnode';
export class ServerReadyNode {
    public type: string;
    public id: number;
    public internals: ServerReadyInternal[] = [];

    constructor(node: GraphNode) {
        this.type = node.name;
        this.id = node.id;
        node.internals.forEach(internal => {
            const srInternal: ServerReadyInternal = new ServerReadyInternal();
            srInternal.name = internal.name;
            srInternal.value = internal.value;
            this.internals.push(srInternal);
        });
    }
}
