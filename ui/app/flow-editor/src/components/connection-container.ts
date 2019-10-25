import { LitElement, html, customElement, css, property } from "lit-element";
import { project, EditorWorkspace } from "..";

@customElement("connection-container")
export class ConnectionContainer extends LitElement {
    @property({ attribute: false }) private workspace: EditorWorkspace;

    constructor() {
        super();
        project.addListener("connectioncreated", () => {
            this.requestUpdate();
        });
        project.addListener("connectionremoved", () => {
            this.requestUpdate();
        });
        project.addListener("cleared", () => {
            this.requestUpdate();
        });
    }

    protected render() {
        return html`${project.connections.map((c) => html`<connection-line .workspace="${this.workspace}" .connection="${c}"></connection-line>`)}`;
    }
}
