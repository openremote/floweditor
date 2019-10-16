import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeType } from "@openremote/model";
import { Camera } from "../models/camera";
import { EditorWorkspace } from "./editor-workspace";

@customElement("flow-node")
export class FlowNode extends LitElement {
    @property({ attribute: false }) public node: Node;
    @property({ attribute: false }) public workspace: EditorWorkspace;

    public firstUpdated() {
        this.workspace.addEventListener("pan", () => {
            this.requestUpdate();
        });
        this.workspace.addEventListener("zoom", () => {
            this.requestUpdate();
        });
    }

    static get styles() {
        return css`
        :host{
            min-width: 256px;
            min-height: 128px;
            background: rgb(200,200,200);
            display: block;
            position: absolute;
            border-radius: var(--roundness);
            transform-origin: 0 0;
        }
        `;
    }

    public render() {
        if (!this.node) {
            this.node = {};
        }
        const pos = this.workspace.worldToScreen(this.node.position);
        this.style.left = pos.x + "px";
        this.style.top = pos.y + "px";
        this.style.transform = `scale(${this.workspace.camera.zoom})`;

        return html`
        ${this.node.name || "invalid"}
        `;
    }
}
