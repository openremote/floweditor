import { NodeCollection, NodeSocket, NodeType, Node, NodeConnection, ValueType, NodeDataType, AttributeValueType, NodePosition } from "@openremote/model";

export class NodeUtilities {
    public static getInputNodeConnections(node: Node, collection: NodeCollection): NodeSocket[] {
        const result: NodeSocket[] = [];

        for (const socket of node.inputs) {
            const connected = collection.connections.filter((c) => c.to === socket)[0];
            result.push(connected ? connected.from : null);
        }

        return result;
    }

    public static getOutputNodeConnections(node: Node, collection: NodeCollection): NodeSocket[][] {
        const result: NodeSocket[][] = [];

        for (const socket of node.outputs) {
            const connected = collection.connections.filter((c) => c.from === socket).map((c) => c.to);
            result.push(connected);
        }

        return result;
    }

    public static getNodeFromID(id: string, nodes: Node[]) {
        const node = nodes.find((n) => n.id === id);
        if (!node) { console.warn(`Node with ID ${id} not found`); }
        return node;
    }

    public static convertValueTypeToSocketType(value: ValueType): NodeDataType {
        switch (value) {
            case ValueType.BOOLEAN: return NodeDataType.BOOLEAN;
            case ValueType.NUMBER: return NodeDataType.NUMBER;
            case ValueType.STRING: return NodeDataType.STRING;
            default: return NodeDataType.ANY;
        }
    }

    public static add(a: NodePosition, b: NodePosition): NodePosition {
        return { x: a.x + b.x, y: a.y + b.y };
    }

    public static subtract(a: NodePosition, b: NodePosition): NodePosition {
        return { x: a.x - b.x, y: a.y - b.y };
    }

    public static multiply(a: NodePosition, b: number): NodePosition {
        return { x: a.x * b, y: a.y * b };
    }

    public static lerpNumber(x: number, y: number, t: number) {
        return x * (1 - t) + y * t;
    }

    public static lerp(a: NodePosition, b: NodePosition, t: number): NodePosition {
        const x = this.lerpNumber(a.x, b.x, t);
        const y = this.lerpNumber(a.y, b.y, t);

        return { x, y };
    }
}
