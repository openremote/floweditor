import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeType, NodeSocket, NodeDataType } from "@openremote/model";
import { Camera } from "../models/camera";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink } from "node-structure";
import { project } from "..";

@customElement("flow-node")
export class FlowNode extends LitElement {
    @property({ attribute: false }) public node: Node;
    @property({ attribute: false }) public workspace: EditorWorkspace;

    constructor(){
        super();
        console.log("yep... new one made");
    }

    private isDragging = false;

    public firstUpdated() {
        this.workspace.addEventListener("pan", () => {
            this.requestUpdate();
        });
        this.workspace.addEventListener("zoom", () => {
            this.requestUpdate();
        });
        this.bringToFront();
    }

    static get styles() {
        return css`
        :host{
            white-space: nowrap;
            min-width: 80px;
            min-height: 80px;
            background: rgb(200,200,200);

            display: grid;
            grid-template-columns: 1fr auto 1fr;
            grid-template-rows: auto 1fr;
            grid-template-areas: 
                "title title title"
                "input internal output";

            position: absolute;
            border-radius: var(--roundness);
            transform-origin: 0 0;

            box-shadow: rgba(0, 0, 0, 0.05) 0 2px 4px;
            z-index: 0;

            --socket-size: 24px;
            --socket-display-size: 14px;
        }

        .socket-side{
            display: flex;
            flex-direction: column;
            justify-content: center;
            justify-content: space-evenly;
        }
        
        .socket .circle{
            background: grey;
            width: var(--socket-display-size);
            height: var(--socket-display-size);
            border-radius: 100%;
            pointer-events: none;

            filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));
        }
        
        .inputs{
            grid-area: input;
            align-items: flex-start;
        }
        
        .inputs .socket{
            transform: translateX(calc(var(--socket-size) / -2));
        }
        
        .outputs{
            grid-area: output;
            align-items: flex-end;
        }
        
        .outputs .socket{
            transform: translateX(calc(var(--socket-size) / 2));
        }
        
        .socket{
            border-radius: 100%;
            margin: 0 2px 0 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: none;
            width: var(--socket-size);
            height: var(--socket-size);
        }

        .socket:hover{
            background: var(--highlight);
        }

        .title{
            grid-area: title;
            padding: 3px 6px 3px 6px;
            background: rgb(180,180,180);
            border-radius: inherit;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            color: white;
            cursor: grab;
        }
        
        .title.input{
            background: var(--input-color);
            text-align: right;
        }
        
        .title.processor{
            background: var(--processor-color);
            text-align: center;
        }
        
        .title.output{
            background: var(--output-color);
            text-align: left;
        }
        `;
    }

    public render() {
        IdentityDomLink.map[this.node.id] = this;

        if (!this.node) {
            this.node = {};
            console.warn("Node component has null node");
        }

        const pos = this.workspace.worldToScreen(this.node.position);
        this.style.left = pos.x + "px";
        this.style.top = pos.y + "px";
        this.style.transform = `scale(${this.workspace.camera.zoom})`;

        const inputs = [];
        for (const socket of this.node.inputs) {
            inputs.push(this.socketTemplate(socket));
        }

        const outputs = [];
        for (const socket of this.node.outputs) {
            outputs.push(this.socketTemplate(socket));
        }

        return html`
        <div class="title ${this.node.type.toLowerCase()}" @mousedown="${this.startDrag}" style="background: ${""}">${this.node.name || "invalid"}</div>
        <div class="socket-side inputs">${inputs}</div>
        <div class="socket-side outputs">${outputs}</div>
        `;
    }

    public bringToFront() {
        this.style.zIndex = `${this.workspace.topNodeZindex++}`;
    }

    private socketTemplate(socket: NodeSocket) {
        let color = "null";

        switch (socket.type) {
            case NodeDataType.ANY: color = "var(--any)"; break;
            case NodeDataType.NUMBER: color = "var(--number)"; break;
            case NodeDataType.BOOLEAN: color = "var(--boolean)"; break;
            case NodeDataType.STRING: color = "var(--string)"; break;
            case NodeDataType.COLOR: color = "var(--color)"; break;
        }

        const md = (e: MouseEvent) => {
            project.startConnectionDrag(e, socket);
        };

        const mu = (e: MouseEvent) => {
            project.endConnectionDrag(e, socket);
        };

        return html`<div @mousedown="${md}" @mouseup="${mu}" class="socket"><div class="circle" style="background: ${color}"></div></div>`;
    }

    private startDrag = (e: MouseEvent) => {
        if (e.buttons !== 1) { return; }

        this.isDragging = true;
        this.bringToFront();
        window.addEventListener("mouseup", this.stopDrag);
        window.addEventListener("mousemove", this.onDrag);
    }

    private onDrag = (e: MouseEvent) => {
        this.node.position = {
            x: this.node.position.x + e.movementX / this.workspace.camera.zoom,
            y: this.node.position.y + e.movementY / this.workspace.camera.zoom
        };
        this.requestUpdate();
    }

    private stopDrag = (e: MouseEvent) => {
        window.removeEventListener("mouseup", this.stopDrag);
        window.removeEventListener("mousemove", this.onDrag);
        this.isDragging = false;
    }
}
