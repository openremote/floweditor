import { ServerReadyNode } from './ServerReadyNode';
import { ServerReadyConnection } from './ServerReadyConnection';

export class NodeSet {
    public nodes: ServerReadyNode[] = [];
    public connections: ServerReadyConnection[] = [];
}

