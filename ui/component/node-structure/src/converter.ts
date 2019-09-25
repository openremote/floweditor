import { NodeUtilities } from "./utils";
import { NodeImplementation, Node, NodeSocket, NodeCollection, NodeType } from "@openremote/model";
export class NodeGraphTranslator {

    private implementations: { [name: string]: NodeImplementation; } = {};
    private nodes: Node[] = [];

    public registerNode(node: Node, implementation: NodeImplementation) {
        if (this.hasNode(node.name)) {
            throw new Error(`Attempt to register registered node ${node.name}`);
        }
        this.nodes.push(node);
        this.implementations[node.name] = implementation;
        console.log("node registered: " + JSON.stringify(node, null, 2));
    }

    public deregisterNode(node: Node) {
        if (!this.hasNode(node.name)) {
            throw new Error(`Attempt to deregister unregistered node: ${node.name}`);
        }
        this.nodes.splice(this.nodes.indexOf(node), 1);
        this.implementations[node.name] = null;
        console.warn("node deregistered: " + node.name);
    }

    public hasNode(name: string) {
        return this.implementations[name] != null && this.nodes.filter((n) => n.name === name).length === 1;
    }

    public getImplementation(nodeName: string) {
        return this.implementations[nodeName];
    }

    public getNodeAt(index: number) {
        return this.nodes[index];
    }

    public getAllNodes() {
        return this.nodes.slice(0);
    }

    public executeNode(socket: NodeSocket, collection: NodeCollection) {
        const node = NodeUtilities.getNodeFromID(socket.nodeId, collection.nodes);
        const impl = this.getImplementation(node.name);
        const index = node.outputs.indexOf(socket);
        // TODO: implement
        /*
        return impl.execute(
            {
                outputSocketIndex: index,
                outputSocket: socket,
                inputs: NodeUtilities.getInputConnections(node, collection),
                outputs: NodeUtilities.getOutputConnections(node, collection),
                internals: node.internals,
                node: node,
                collection: collection,
                translator: this
            }
        );*/
    }

    public executeOutputNode(node: Node, collection: NodeCollection) {
        const impl = this.getImplementation(node.name);
        // TODO: implement
        /*
        return impl.execute(
            {
                outputSocketIndex: -1,
                outputSocket: null,
                inputs: NodeUtilities.getInputConnections(node, collection),
                outputs: NodeUtilities.getOutputConnections(node, collection),
                internals: node.internals,
                node: node,
                collection: collection,
                translator: this
            }
        );*/
    }

    public translate(name: string, description: string, collection: NodeCollection): string {
        return "Deprecated";
        // if (collection.nodes.filter((n) => n.type === NodeType.THEN).length !== 0) {
        //     throw new Error("THEN nodes are no longer allowed");
        // }

        // const outputs = collection.nodes.filter((n) => n.type === GraphNodeType.Output);
        // const ruleset: JsonRulesetDefinition = { rules: [] };

        // for (const output of outputs) {
        //     const rule: JsonRule = {
        //         name,
        //         description,
        //         then: [],
        //     };

        //     // somehow seperate the condtion and action parts from the resulting array of nodes
        //     const translated: any = this.executeOutputNode(output, collection);
        //     rule.then.push(translated);

        //     ruleset.rules.push(rule);
        // }

        // return JSON.stringify(ruleset, null, 2);
    }
}
