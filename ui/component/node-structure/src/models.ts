import { RuleCondition, RuleAction, RuleActionUnion, Picker, NodePosition, ServerReadyInternal } from "@openremote/model";
import { NodeGraphTranslator } from "./converter";
import { Point } from "mapbox-gl";

export enum GraphNodeType {
    Input = "Input",
    Processor = "Processor",
    Output = "Output",
    /**
     * @deprecated This node type is deprecated because the NodeGraphTranslator decides when the rule is executed
     */
    Then = "Then"
}

export enum GraphDataTypes {
    Number = "Number",
    String = "String",
    Boolean = "Boolean",
    /**
     * @deprecated This data type is deprecated because the NodeGraphTranslator decides when the rule is executed
     */
    Trigger = "Trigger",
    Color = "Color",
    Any = "Any"
}

export class Connection {
    constructor(
        public from: GraphSocket,
        public to: GraphSocket) {
    }
}

export class GraphNode {
    public id?: string;
    public inputs: GraphSocket[] = [];
    public outputs: GraphSocket[] = [];
    public internals: ServerReadyInternal[] = [];
    public name: string;
    public type: GraphNodeType;
    public position?: NodePosition;
}

export class GraphSocket {
    public node?: GraphNode;
    public id?: string;
    constructor(public name: string, public type: GraphDataTypes, ) {
    }
}

export interface ExecutionRequestInfo {
    collection: GraphNodeCollection;
    outputSocketIndex: number;
    outputSocket: GraphSocket;
    node: GraphNode;
    inputs: GraphSocket[];
    outputs: GraphSocket[][];
    internals: ServerReadyInternal[];
    translator: NodeGraphTranslator;
}

export interface GraphNodeImplementation {
    /**
     * Not sure what this has to do or what it needs to be called yet
     */
    execute(info: ExecutionRequestInfo): RuleCondition | RuleActionUnion | string | boolean | number;
}

export interface GraphNodeDefinition {
    definition: GraphNode;
    implementation: GraphNodeImplementation;
}

export class GraphNodeCollection {
    constructor(
        public nodes: GraphNode[],
        public connections: Connection[]
    ) { }
}
