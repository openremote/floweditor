import { ServerReadyNode } from './server.ready.node';
import { ServerReadyConnection } from './server.ready.connection';

export class NodeSet {
    public nodes: ServerReadyNode[] = [];
    public connections: ServerReadyConnection[] = [];
}

