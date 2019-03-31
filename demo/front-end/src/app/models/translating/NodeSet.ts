import { ServerReadyNode } from './serverreadynode';
import { ServerReadyConnection } from './serverreadyconnection';

export class NodeSet {
    public nodes: ServerReadyNode[] = [];
    public connections: ServerReadyConnection[] = [];
}

