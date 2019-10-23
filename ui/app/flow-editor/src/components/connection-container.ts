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
            this.requestUpdate();
        });
    }

    public render() {
        const connections = [];
        for (const c of project.connections) {
            connections.push(html`<connection-line .workspace="${this.workspace}" .from="${c.from}" .to="${c.to}"></connection-line>`);
        }

        return html`${connections}`;
    }
}
