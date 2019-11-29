import { expect } from "chai";
import { CopyMachine } from "..";
import { Node, NodeDataType, NodeType, NodeSocket, NodeInternal, PickerType } from "@openremote/model";
import "mocha";

describe("copy machine", () => {
    describe("copies", () => {
        it("inputs", () => {
            const originalNodeId = "anything but this";
            const original: Node = {
                id: originalNodeId,
                name: "bool to string",
                type: NodeType.INPUT,
                outputs: [
                    { id: "output 1", index: 0, name: "out", nodeId: originalNodeId, type: NodeDataType.STRING },
                    { id: "output 2", index: 0, name: "yes", nodeId: originalNodeId, type: NodeDataType.ANY },
                    { id: "output 3", index: 0, name: "AWCX*HN&", nodeId: originalNodeId, type: NodeDataType.COLOR },
                ],
                position: { x: 0, y: 0 },
                size: { x: 5000, y: 25 },
            };

            checkCopy(original);
        });
        it("processors", () => {
            const originalNodeId = "nothing";
            const original: Node = {
                id: originalNodeId,
                name: "bool to string",
                type: NodeType.PROCESSOR,
                inputs: [
                    { id: "input 1", index: 0, name: "in", nodeId: originalNodeId, type: NodeDataType.BOOLEAN },
                    { id: "input 2", index: 0, name: "😎", nodeId: originalNodeId, type: NodeDataType.NUMBER },
                ],
                outputs: [
                    { id: "output 1", index: 0, name: "out", nodeId: originalNodeId, type: NodeDataType.STRING },
                    { id: "output 2", index: 0, name: "yes", nodeId: originalNodeId, type: NodeDataType.ANY },
                    { id: "output 3", index: 0, name: "AWCX*HN&", nodeId: originalNodeId, type: NodeDataType.COLOR },
                ],
                internals: [
                    {
                        name: "cool internal name", picker: {
                            type: PickerType.DROPDOWN,
                            options: [
                                { name: "option one", value: -52.76 },
                                { name: "option two", value: false },
                                { name: "option three", value: { name: "a new object", position: "right here" } },
                            ]
                        }
                    },
                    {
                        name: "another internal", picker: {
                            type: PickerType.MULTILINE
                        }
                    },
                ],
                position: { x: 2435, y: -524 },
                size: { x: 264, y: 5 },
            };

            checkCopy(original);
        });
        it("outputs", () => {
            const originalNodeId = "should never appear again";
            const original: Node = {
                id: originalNodeId,
                name: "bool to string",
                type: NodeType.OUTPUT,
                inputs: [
                    { id: "input 1", index: 0, name: "in", nodeId: originalNodeId, type: NodeDataType.BOOLEAN },
                    { id: "input 2", index: 0, name: "😎", nodeId: originalNodeId, type: NodeDataType.NUMBER },
                ],
                internals: [
                    {
                        name: "cool internal", picker: {
                            type: PickerType.MULTILINE
                        }
                    },
                ],
                position: { x: 245, y: 4 },
                size: { x: 23, y: -5656 },
            };

            checkCopy(original);
        });
    });
});

function checkCopy(original: Node) {
    const copy = CopyMachine.copy(original);
    expect(copy).to.exist;
    expect(copy.id).to.not.equal(original.id);
    expect(copy.name).to.equal(original.name);
    expect(copy.type).to.equal(original.type);
    expect(copy.displayCharacter).to.equal(original.displayCharacter);
    const checkSocket = (originalCollection: NodeSocket[], cloneCollection: NodeSocket[]) => {
        if (!originalCollection){
            expect(cloneCollection).to.be.empty;
            return;
        }
        expect(originalCollection.length).to.equal(cloneCollection.length);
        for (let i = 0; i < originalCollection.length; i++) {
            const originalSocket = originalCollection[i];
            const clonedSocket = cloneCollection[i];
            expect(clonedSocket.index).to.not.exist;
            expect(clonedSocket.id).to.not.equal(originalSocket.id);
            expect(clonedSocket.nodeId).to.equal(copy.id);
            expect(clonedSocket.name).to.equal(originalSocket.name);
            expect(clonedSocket.type).to.equal(originalSocket.type);
        }
    };
    const checkInternal = (originalCollection: NodeInternal[], cloneCollection: NodeInternal[]) => {
        if (!originalCollection){
            expect(cloneCollection).to.be.empty;
            return;
        }
        for (let i = 0; i < originalCollection.length; i++) {
            const originalInternal = originalCollection[i];
            const clonedInternal = cloneCollection[i];
            expect(clonedInternal.name).to.equal(originalInternal.name);
            expect(clonedInternal.value).to.not.exist;
            if (originalInternal) {
                expect(clonedInternal.picker.type).to.equal(originalInternal.picker.type);
                if (originalInternal.picker.options) {
                    expect(clonedInternal.picker.options.length).to.equal(originalInternal.picker.options.length);
                    for (let j = 0; j < originalInternal.picker.options.length; j++) {
                        const originalOption = originalInternal.picker.options[j];
                        const clonedOption = clonedInternal.picker.options[j];
                        expect(clonedOption.name).to.equal(originalOption.name);
                        expect(clonedOption.value).to.deep.equal(originalOption.value);
                    }
                }
                else {
                    expect(clonedInternal.picker.options).to.not.exist;
                }
            }
            else {
                expect(clonedInternal).to.not.exist;
            }
        }
    };
    checkSocket(original.inputs, copy.inputs);
    checkSocket(original.outputs, copy.outputs);
    checkInternal(original.internals, copy.internals);
}

