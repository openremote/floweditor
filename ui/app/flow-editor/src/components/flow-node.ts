import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeType } from "@openremote/model";

@customElement("flow-node")
export class FlowNode extends LitElement {
    @property({ attribute: false }) public node: Node;

    @property({ type: Number }) public panX: number;
    @property({ type: Number }) public panY: number;

    static get styles() {
        return css`
        :host{
            min-width: 256px;
            min-height: 128px;
            background: rgb(200,200,200);
            display: block;
            position: absolute;
            border-radius: var(--roundness);
        }
        `;
    }

    public render() {
        if (!this.node) {
            this.node = {};
        }

        this.style.left = this.panX + "px";
        this.style.top = this.panY + "px";

        return html`
        ${this.node.name || "invalid"}
        `;
    }
}
