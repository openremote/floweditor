import { LitElement, html, customElement, css } from "lit-element";
import { NodeType, Node } from "@openremote/model";

@customElement("node-panel")
export class NodePanel extends LitElement {
    static get styles() {
        return css`
        :host{
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .category{
            display: flex;
            width: 80%;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 15px 15px 0 15px;
        }

        .category span{
            margin:0;
            color: rgb(125,125,125);
            padding: 0 0 15px 0 ;
        }

        .input-node{ background-color: var(--input-color); }
        .processor-node{ background-color: var(--processor-color); }
        .output-node{ background-color: var(--output-color); }

        .input-node:hover{ background-color: var(--input-color-h); }
        .processor-node:hover{ background-color: var(--processor-color-h); }
        .output-node:hover{ background-color: var(--output-color-h); }
        `;
    }

    public node: Node;

    public render() {
        const inputs = [];
        const processors = [];
        const outputs = [];

        for (let i = 0; i < 4; i++) {
            inputs.push(html`<node-menu-item class="node-item" .node="${{name: "input node " + i, type: NodeType.INPUT}}">${i}</node-menu-item>`);
        }

        for (let i = 0; i < 8; i++) {
            processors.push(html`<node-menu-item class="node-item" .node="${{name: "processor node " + i, type: NodeType.PROCESSOR}}">${i}</node-menu-item>`);
        }

        for (let i = 0; i < 2; i++) {
            outputs.push(html`<node-menu-item class="node-item" .node="${{name: "output node " + i, type: NodeType.OUTPUT}}">${i}</node-menu-item>`);
        }

        return html`
        <div class="category"> <span>INPUT</span> ${inputs}</div>
        <div class="category"> <span>PROCESSOR</span> ${processors}</div>
        <div class="category"> <span>OUTPUT</span> ${outputs}</div>
        `;
    }
}
