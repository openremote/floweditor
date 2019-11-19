import "mocha";
import { expect } from "chai";
import { NodeUtilities } from "..";
import { ValueType, NodeDataType, Node } from "@openremote/model";

describe("utils", () => {
    it("lerps", () => {
        expect(NodeUtilities.lerp(
            { x: 0, y: 0 },
            { x: 0, y: 100 },
            0.5
        )).to.deep.equal({ x: 0, y: 50 });
        expect(NodeUtilities.lerp(
            { x: -100, y: 0 },
            { x: 0, y: 100 },
            0.5
        )).to.deep.equal({ x: -50, y: 50 });
    });

    it("multiplies", () => {
        expect(NodeUtilities.multiply(
            { x: 5, y: 2 },
            6,
        )).to.deep.equal({ x: 30, y: 12 });
    });

    it("subtracts", () => {
        expect(NodeUtilities.subtract(
            { x: 100, y: 50 },
            { x: 25, y: 25 },
        )).to.deep.equal({ x: 75, y: 25 });
    });

    it("adds", () => {
        expect(NodeUtilities.add(
            { x: 100, y: 50 },
            { x: 25, y: 25 },
        )).to.deep.equal({ x: 125, y: 75 });
    });

    it("converts a value type to socket type", () => {
        expect(NodeUtilities.convertValueTypeToSocketType(ValueType.BOOLEAN)).to.equal(NodeDataType.BOOLEAN);
        expect(NodeUtilities.convertValueTypeToSocketType(ValueType.STRING)).to.equal(NodeDataType.STRING);
        expect(NodeUtilities.convertValueTypeToSocketType(ValueType.NUMBER)).to.equal(NodeDataType.NUMBER);
        expect(NodeUtilities.convertValueTypeToSocketType(ValueType.ARRAY)).to.equal(NodeDataType.ANY);
        expect(NodeUtilities.convertValueTypeToSocketType(ValueType.OBJECT)).to.equal(NodeDataType.ANY);
        expect(NodeUtilities.convertValueTypeToSocketType(ValueType.ANY)).to.equal(NodeDataType.ANY);
    });

    it("gets a node from an ID", () => {
        const nodes: Node[] = [
            { name: "hello", id: "wf4e0n" },
            { name: "world", id: "jvw984" },
            { name: "!!!!", id: "fse09d" },
        ];

        for (const node of nodes) {
            expect(NodeUtilities.getNodeFromID(node.id, nodes).name).to.equal(node.name);
        }
        expect(NodeUtilities.getNodeFromID("invalid :)", nodes)).to.not.exist;
    });
});
