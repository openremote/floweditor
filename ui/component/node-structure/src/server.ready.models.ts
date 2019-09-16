export interface ServerReadyNodeCollection {
    name: string;
    description: string;
    nodes: ServerReadyNode[];
    connections: ServerReadyConnection[];
}

export interface ServerReadyConnection {
    from: ServerReadySocket;
    to: ServerReadySocket;
}

export interface ServerReadyNode {
    id: number;
    type: string;
    name: string;
    position: { x: number, y: number };
    internals: ServerReadyInternal[];
    inputs: ServerReadySocket[];
    outputs: ServerReadySocket[];
}

export interface ServerReadySocket {
    name: string;
    type: string;
    nodeId: number;
    index: number;
}

export interface ServerReadyInternal {
    name: string;
    value: any;
}
