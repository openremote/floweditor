import { LitElement, html, customElement, css } from "lit-element";
import { NodeType, Node } from "@openremote/model";
import { i18next } from "@openremote/or-translate";
import { integration } from "./main-application";

@customElement("node-panel")
export class NodePanel extends LitElement {
    private nodes: Node[] = [];

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
        .output-node:hover{ background-color: var(--output-color-h); }`;
    }

    protected firstUpdated() {
        this.refreshNodes();
    }

    public async refreshNodes() {
        this.nodes = [];
        const allNodes = (await integration.rest.api.FlowResource.getAllNodeDefinitions()).data;
        for (const n of allNodes) {
            this.nodes.push(n);
        }
        this.requestUpdate();
    }

    protected render() {
        const inputs = [];
        const processors = [];
        const outputs = [];

        for (const node of this.nodes.filter((n) => n.type === NodeType.INPUT)) {
            inputs.push(html`<node-menu-item class="node-item" .node="${node}"></node-menu-item>`);
        }

        for (const node of this.nodes.filter((n) => n.type === NodeType.PROCESSOR)) {
            processors.push(html`<node-menu-item class="node-item" .node="${node}"></node-menu-item>`);
        }

        for (const node of this.nodes.filter((n) => n.type === NodeType.OUTPUT)) {
            outputs.push(html`<node-menu-item class="node-item" .node="${node}"></node-menu-item>`);
        }

        return html`
        <div class="category"> <span>${i18next.t("input", "Input")}</span> ${inputs}</div>
        <div class="category"> <span>${i18next.t("processors", "Processors")}</span> ${processors}</div>
        <div class="category"> <span>${i18next.t("output", "Output")}</span> ${outputs}</div>
        `;
    }
}
