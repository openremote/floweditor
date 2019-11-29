import { LitElement, html, customElement, css, property, query } from "lit-element";
import { NodeType, Node } from "@openremote/model";
import { i18next } from "@openremote/or-translate";
import { OrMwcDrawer } from "@openremote/or-mwc-components/dist/or-mwc-drawer";
import { FlowEditor } from "./flow-editor";

@customElement("node-panel")
export class NodePanel extends LitElement {
    @property({ type: Array }) public nodes: Node[] = [];
    static get styles() {
        return css`
        .list{
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: calc(100vh - var(--topbar-height));
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

    @query("or-mwc-drawer") public drawer: OrMwcDrawer;
    @property({ attribute: false }) public application: FlowEditor;

    protected render() {
        return html`
        <or-mwc-drawer rightsided dismissible>
            ${this.listTemplate}
        </or-mwc-drawer>
        `;
    }

    private get listTemplate() {
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
        <div class="list">
            <div class="category"> <span>${i18next.t("input", "Input")}</span> ${inputs}</div>
            <div class="category"> <span>${i18next.t("processors", "Processors")}</span> ${processors}</div>
            <div class="category"> <span>${i18next.t("output", "Output")}</span> ${outputs}</div>
        </div>
        `;
    }
}
