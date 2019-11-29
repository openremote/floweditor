import "mocha";
import { expect } from "chai";
import { SocketTypeMatcher } from "..";
import { NodeDataType } from "@openremote/model";

describe("socket type matcher", () => {
    it("follows correct node socket matches", () => {
        expect(SocketTypeMatcher.match(
            NodeDataType.BOOLEAN,
            NodeDataType.BOOLEAN
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.COLOR,
            NodeDataType.COLOR
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.NUMBER,
            NodeDataType.NUMBER
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.STRING,
            NodeDataType.STRING
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.ANY,
            NodeDataType.ANY
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.ANY,
            NodeDataType.BOOLEAN
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.COLOR,
            NodeDataType.ANY
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.NUMBER,
            NodeDataType.ANY
        )).to.be.true;
        expect(SocketTypeMatcher.match(
            NodeDataType.ANY,
            NodeDataType.STRING
        )).to.be.true;

        expect(SocketTypeMatcher.match(
            NodeDataType.BOOLEAN,
            NodeDataType.COLOR
        )).to.be.false;
        expect(SocketTypeMatcher.match(
            NodeDataType.COLOR,
            NodeDataType.NUMBER
        )).to.be.false;
        expect(SocketTypeMatcher.match(
            NodeDataType.NUMBER,
            NodeDataType.STRING
        )).to.be.false;
        expect(SocketTypeMatcher.match(
            NodeDataType.STRING,
            NodeDataType.BOOLEAN
        )).to.be.false;
    });
});
