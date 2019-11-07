import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeType } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { CopyMachine } from "node-structure";
import { project, newIds } from "..";
import { Utilities } from "../utils";
import { FlowNode } from "./flow-node";

@customElement("node-menu-item")
export class NodeMenuItem extends LitElement {
    @property({ attribute: false }) public node: Node;
    @property({ attribute: false }) private isDragging = false;

    @property({ attribute: false }) private x = 0;
    @property({ attribute: false }) private y = 0;

    private xOffset = 0;
    private yOffset = 0;

    constructor() {
        super();
        this.addEventListener("mousedown", this.startDrag);
    }
    static get styles() {
        return css`
        :host, .node-drag-item{
            padding: 4px;
            margin: 0 0 15px 0;
            display: inline-block;
            text-align: center;
            color: white;
            border-radius: var(--roundness);
            box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -5px;

            width: calc(var(--node-panel-width) * 0.7);
            height: 22px;
            line-height: 22px;
            cursor:grab;
            transition: box-shadow 150ms;
        }
        
        .node-drag-item{
            z-index: 5000;
            position: absolute;
            background: inherit;
            box-shadow: rgba(0, 0, 0, 0.2) 0 2px 15px;
            filter: opacity(90%);
            pointer-events: none;
        }
        `;
    }

    protected render() {
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
        ${this.isDragging ? this.dragNodeTemplate : null}
        `;
    }

    private get dragNodeTemplate() {
        return html`<div class="node-drag-item" style="top: ${this.y - this.yOffset}px; left: ${this.x - this.xOffset}px">${this.node.name}</div>`;
    }

    private startDrag = (e: MouseEvent) => {
        this.xOffset = e.offsetX;
        this.yOffset = e.offsetY;
        this.x = e.clientX;
        this.y = e.clientY;

        this.isDragging = true;
        window.addEventListener("mouseup", this.stopDrag);
        window.addEventListener("mousemove", this.onMove);
    }

    private onMove = (e: MouseEvent) => {
        this.x = e.clientX;
        this.y = e.clientY;
    }

    private stopDrag = (e: MouseEvent) => {
        window.removeEventListener("mouseup", this.stopDrag);
        window.removeEventListener("mousemove", this.onMove);
        this.isDragging = false;

        const workspace = document.getElementById("app").shadowRoot.getElementById("workspace") as EditorWorkspace;
        if (Utilities.isPointInsideBox(e.offsetX, e.offsetY, {
            x: workspace.clientRect.left,
            y: workspace.clientRect.top,
            width: workspace.clientRect.width,
            height: workspace.clientRect.height,
        })) {
            const copy = CopyMachine.copy(this.node);
            newIds.add(copy.id);
            copy.position = workspace.offsetToWorld({ x: e.offsetX - workspace.offsetLeft, y: e.offsetY - workspace.offsetTop });
            project.addNode(copy);
        }
    }
}
