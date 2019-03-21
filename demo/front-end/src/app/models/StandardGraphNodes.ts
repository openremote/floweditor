import { GraphNode } from './graphnode';
import { GraphNodeType } from './GraphNodeType';
import { GraphSocket } from './GraphSocket';
import { GraphDataTypes } from './GraphDataTypes';

export class StandardGraphNodes {

    public static CreateAddNode(): GraphNode {
        let n = new GraphNode("Add", GraphNodeType.Processor);
        n.inputs = [
            new GraphSocket("a", GraphDataTypes.Number),
            new GraphSocket("b", GraphDataTypes.Number)
        ];
        n.outputs = [
            new GraphSocket("sum", GraphDataTypes.Number)
        ];
        return n;
    }

    public static CreateNumberNode(): GraphNode {
        let n = new GraphNode("Number", GraphNodeType.Input);
        n.outputs = [
            new GraphSocket("value", GraphDataTypes.Number)
        ];
        return n;
    }

    public static CreateTextNode(): GraphNode {
        let n = new GraphNode("Text", GraphNodeType.Input);
        n.outputs = [
            new GraphSocket("value", GraphDataTypes.String)
        ];
        return n;
    }

    public static CreateBooleanNode(): GraphNode {
        let n = new GraphNode("Boolean", GraphNodeType.Input);
        n.outputs = [
            new GraphSocket("value", GraphDataTypes.Boolean)
        ];
        return n;
    }
}