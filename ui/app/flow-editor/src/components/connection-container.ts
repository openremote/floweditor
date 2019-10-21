import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeSocket, NodeDataType } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink } from "node-structure";
import { project } from "..";

@customElement("connection-container")
export class ConnectionContainer extends LitElement {
    @property({ attribute: false }) private workspace: EditorWorkspace;

    constructor() {
        super();
        project.addListener("connectioncreated", (from: NodeSocket, to: NodeSocket) => {
            console.debug(from);
            console.debug(to);
            this.requestUpdate();
        });
    }

    public render() {
        const connections = [];
        for (const c of project.connections) {
            connections.push(html`<connection-line .workspace="${this.workspace}" .from="${c.from}" .to="${c.to}"></connection-line>`);
        }

        console.debug(connections);
        return html`${connections}`;
    }
}
