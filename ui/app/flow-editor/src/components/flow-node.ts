import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeType } from "@openremote/model";
import { Camera } from "../models/camera";

@customElement("flow-node")
export class FlowNode extends LitElement {
    @property({ attribute: false }) public node: Node;

    @property({ attribute: false, reflect: true }) public camera: Camera;

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

        this.style.left = (this.node.position.x + this.camera.x) * this.camera.zoom  + "px";
        this.style.top = (this.node.position.y + this.camera.y) * this.camera.zoom  + "px";
        this.style.transform = `scale(${this.camera.zoom})`;

        return html`
        ${this.node.name || "invalid"}
        `;
    }
}
