import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeSocket, NodeDataType } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink } from "node-structure";
import { project, Utilities } from "..";

@customElement("connection-line")
export class ConnectionLine extends LitElement {
    @property({ attribute: false }) public from: NodeSocket;
    @property({ attribute: false }) public to: NodeSocket;

    @property({ attribute: false }) public workspace: EditorWorkspace;

    public firstUpdated() {
        const update = () => { this.requestUpdate(); };
        this.workspace.addEventListener("pan", update);
        this.workspace.addEventListener("zoom", update);
        this.workspace.addEventListener("nodemove", update);
    }

    public render() {
        const fromElement = IdentityDomLink.map[this.from.id] as HTMLElement;
        const toElement = IdentityDomLink.map[this.to.id] as HTMLElement;

        const parentSize = this.workspace.clientRect;
        const from = Utilities.getCenter(fromElement.getBoundingClientRect());
        const to = Utilities.getCenter(toElement.getBoundingClientRect());

        return html`<svg style="overflow: visible; position: absolute;"><line 
        x1="${from.x - parentSize.left}" 
        y1="${from.y - parentSize.top}"
        x2="${to.x - parentSize.left}"
        y2="${to.y - parentSize.top}"
        ></line></svg>`;
    }
}
