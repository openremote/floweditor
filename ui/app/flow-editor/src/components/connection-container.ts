import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeSocket, NodeDataType } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink } from "node-structure";
import { project } from "..";

@customElement("connection-container")
export class ConnectionContainer extends LitElement {
    @property({ attribute: false }) private workspace: EditorWorkspace;

    public render() {
        const connections = project.connections.Select((c) => html`<connection-line .from="${c.from}" .to="${c.to}"></connection-line>`).ToArray();
        return html`${connections}`;
    }
}
