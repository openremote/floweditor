import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeType } from "@openremote/model";

@customElement("node-menu-item")
export class NodeMenuItem extends LitElement {
    @property({ attribute: false }) public node: Node;

    static get styles() {
        return css`
        :host{
            padding: 8px;
            margin: 0 0 15px 0;
            display: inline-block;
            text-align: center;
            background-color: magenta;
            color: white;
        }
        `;
    }

    public render() {
        switch (this.node.type) {
            case NodeType.INPUT:
                this.classList.add("input-node");
                break;
            case NodeType.PROCESSOR:
                this.classList.add("processor-node");
                break;
            case NodeType.OUTPUT:
                this.classList.add("output-node");
                break;
        }

        return html`
        ${this.node.name}
        `;
    }
}
