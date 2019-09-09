export enum PickerType {
    Text = "Text",
    Multiline = "Multiline",
    Number = "Number",
    Dropdown = "Dropdown",
    DoubleDropdown = "DoubleDropdown",
    AssetAttribute = "AssetAttribute",
    Color = "Color"
}

export enum GraphNodeType {
    Input = "Input",
    Processor = "Processor",
    Output = "Output",
    Then = "Then"
}

export enum GraphDataTypes {
    Number = "Number",
    String = "String",
    Boolean = "Boolean",
    Trigger = "Trigger",
    Color = "Color",
    Any = "Any"
}

export class Connection {
    constructor(
        public from: GraphSocket,
        public to: GraphSocket,
        public fromElement: Element,
        public toElement: Element) {
    }
}

export class GraphInternal {
    public name: string;
    public type: GraphDataTypes;
    public picker: Picker;
    public value: any;
}

export class GraphNode {
    public id: number;
    public inputs: GraphSocket[] = [];
    public outputs: GraphSocket[] = [];
    public internals: GraphInternal[] = [];
    public name: string;
    public type: GraphNodeType;
    public position: { x: number, y: number } = { x: 0, y: 0 };
}

export class GraphSocket {
    public node: GraphNode;

    constructor(public name: string, public type: GraphDataTypes) {
    }
}

export interface GraphNodeImplementation {
    /**
     * Not sure what this has to do or what it needs to be called yet
     */
    toJson(inputs: GraphNode[], outputs: GraphNode[], internals: any): string;
}

export class GraphNodeCollection {
    constructor(
        public nodes: GraphNode[],
        public connections: Connection[]
    ) { }
}

export class Picker {
    public type: PickerType;
    public options: { name: string, value: any }[];
}

export class Point {
    public static add(a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    public static subtract(a: Point, b: Point): Point {
        return new Point(a.x - b.x, a.y - b.y);
    }

    public static multiply(a: Point, b: number): Point {
        return new Point(a.x * b, a.y * b);
    }

    public static lerpNumber(x: number, y: number, t: number) {
        return x * (1 - t) + y * t;
    }

    public static lerp(a: Point, b: Point, t: number): Point {
        const x = Point.lerpNumber(a.x, b.x, t);
        const y = Point.lerpNumber(a.y, b.y, t);

        return new Point(x, y);
    }

    constructor(public x: number, public y: number) {

    }
}
