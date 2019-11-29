import { Node, NodeConnection, NodeSocket, NodeCollection } from "@openremote/model";
import { EventEmitter } from "events";
import { SocketTypeMatcher, NodeUtilities } from "node-structure";
import { EditorWorkspace } from "../components/editor-workspace";
import { input } from "../components/flow-editor";

export class Project extends EventEmitter {
    public nodes: Node[] = [];
    public connections: NodeConnection[] = [];
    public workspace: EditorWorkspace;

    public existingFlowRuleId = -1;
    public existingFlowRuleName: string = null;
    public existingFlowRuleDesc: string = null;
    private isInUnsavedState = false;

    private isConnecting = false;
    private connectionStartSocket: NodeSocket;
    private connectionEndSocket: NodeSocket;

    constructor() {
        super();
        this.setMaxListeners(1024);
    }

    public get isCurrentlyConnecting() {
        return this.isConnecting;
    }

    public set unsavedState(state: boolean) {
        if (this.isInUnsavedState !== state) {
            this.isInUnsavedState = state;
            this.emit("unsavedstateset", state);
        }
    }

    public get unsavedState() {
        return this.isInUnsavedState;
    }

    public setCurrentProject(id: number, name: string, desc: string) {
        this.unsavedState = false;
        this.existingFlowRuleId = id;
        this.existingFlowRuleName = name;
        this.existingFlowRuleDesc = desc;
        this.emit("projectset", id);
    }

    public async fromNodeCollection(collection: NodeCollection) {
        await this.clear();
        collection.nodes.forEach((node) => {
            this.addNode(node);
        });
        await this.workspace.updateComplete;
        collection.connections.forEach((conn) => {
            this.createConnection(conn.from, conn.to);
        });
        this.emit("nodecollectionloaded", collection);
        this.unsavedState = false;
    }

    public toNodeCollection(name: string, description: string): NodeCollection {
        return {
            name,
            description,
            connections: this.connections,
            nodes: this.nodes
        };
    }

    public async clear(alsoResetProject = false) {
        input.clearSelection();
        this.nodes.forEach((n) => {
            this.removeNode(n);
        });
        await this.workspace.updateComplete;
        this.nodes = [];
        this.connections = [];
        this.unsavedState = !alsoResetProject;
        if (alsoResetProject) {
            this.setCurrentProject(-1, null, null);
        }
        this.emit("cleared");
    }

    public addNode(node: Node) {
        if (this.nodes.filter((n) => n.id === node.id).length > 0) {
            throw new Error("Node with identical identity already exists in the project");
        }
        this.nodes.push(node);
        this.unsavedState = true;
        this.emit("nodeadded", node);
    }

    public removeNode(node: Node) {
        input.clearSelection();
        this.connections.filter((c) => {
            const from = NodeUtilities.getSocketFromID(c.from, this.nodes);
            const to = NodeUtilities.getSocketFromID(c.to, this.nodes);
            return from.nodeId === node.id || to.nodeId === node.id;
        }).forEach((c) => {
            this.removeConnection(c);
        });
        this.nodes.filter((n) => n.id === node.id).forEach((n) => {
            this.nodes.splice(this.nodes.indexOf(n), 1);
            this.unsavedState = true;
            this.emit("noderemoved", n);
        });
    }

    public startConnectionDrag = (e: MouseEvent, socket: NodeSocket, isInputNode: boolean) => {
        this.connectionStartSocket = null;
        this.connectionEndSocket = null;

        if (isInputNode) {
            this.connectionEndSocket = socket;
        } else {
            this.connectionStartSocket = socket;
        }

        this.isConnecting = true;
        this.emit("connectionstart", e, socket);
    }

    public connectionDragging = (e: MouseEvent) => {
        this.emit("connecting", e);
    }

    public endConnectionDrag = (e: MouseEvent, socket: NodeSocket, isInputNode: boolean) => {
        if (!this.isConnecting) { return; }
        if (isInputNode) {
            this.connectionEndSocket = socket;
        } else {
            this.connectionStartSocket = socket;
        }

        this.isConnecting = false;
        this.emit("connectionend", e, socket);
        this.createConnection(this.connectionStartSocket.id, this.connectionEndSocket.id);
    }

    public removeConnection(connection: NodeConnection) {
        input.clearSelection();
        this.connections.filter((c) => c.from === connection.from && c.to === connection.to).forEach((c) => {
            const index = this.connections.indexOf(c);
            if (index === -1) {
                console.warn("attempt to delete nonexistent connection");
            } else {
                this.connections.splice(index, 1);
                this.unsavedState = true;
                this.emit("connectionremoved", c);
            }
        });
    }

    public isValidConnection(connection: NodeConnection) {
        const fromSocket = NodeUtilities.getSocketFromID(connection.from, this.nodes);
        const toSocket = NodeUtilities.getSocketFromID(connection.to, this.nodes);
        if (!fromSocket ||
            !toSocket) {
            return false;
        }

        if (!SocketTypeMatcher.match(fromSocket.type, toSocket.type) ||
            fromSocket.id === toSocket.id ||
            fromSocket.nodeId === toSocket.nodeId) {
            return false;
        }
        return true;
    }

    public createConnection(fromSocket: string, toSocket: string): boolean {
        const connection = {
            from: fromSocket,
            to: toSocket
        };

        if (!this.isValidConnection(connection)) { return false; }

        for (const c of this.connections.filter((j) => j.to === toSocket)) {
            this.removeConnection(c);
        }

        this.connections.push(connection);
        this.unsavedState = true;
        this.emit("connectioncreated", fromSocket, toSocket);
        return true;
    }

    public removeInvalidConnections() {
        for (const c of this.connections.filter((j) => !this.isValidConnection(j))) {
            this.removeConnection(c);
        }
    }
}
