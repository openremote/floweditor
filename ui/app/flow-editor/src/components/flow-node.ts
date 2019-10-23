import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeSocket, NodeDataType } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink } from "node-structure";
import { project, input, SelectableElement } from "..";

@customElement("flow-node")
export class FlowNode extends SelectableElement {
    @property({ attribute: false }) public node: Node;
    @property({ attribute: false }) public workspace: EditorWorkspace;

    private minimal = false;

    constructor() {
        super();
    }

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
            --socket-size: 24px;
            --socket-display-size: 14px;

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
        }

        :host([minimal = true]){
            min-width: 60px;
            min-height: 60px;
            grid-template-columns: var(--socket-display-size) 1fr var(--socket-display-size);
            grid-template-rows: auto;
            grid-template-areas: 
                "input title output";
            
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
        
        .title.minimal{
            background: transparent;
            font-size: 24px;
            line-height: 50%;
            display: table;
            padding: 15px 0 15px 0;
            text-align: center;
            margin-top: auto;
            margin-bottom: auto;
        }
        
        .title.minimal[singlechar]{
            font-size: 32px;
        }
        `;
    }

    protected updated() {
        this.dispatchEvent(new CustomEvent("updated"));
    }

    protected render() {
        IdentityDomLink.map[this.node.id] = this;

        this.minimal = (this.node.displayCharacter || "").length !== 0;
        this.setAttribute("minimal", this.minimal.toString());
        if (this.minimal) {
            this.addEventListener("mousedown", this.startDrag);
            this.style.background = `var(--${this.node.type.toLowerCase()}-color)`;
        }

        const pos = this.workspace.worldToOffset(this.node.position);
        this.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${this.workspace.camera.zoom})`;
        this.style.boxShadow = this.selected ? "var(--highlight) 0 0 0 3px" : null;

        const inputs = [];
        for (const socket of this.node.inputs) {
            inputs.push(this.socketTemplate(socket, true));
        }

        const outputs = [];
        for (const socket of this.node.outputs) {
            outputs.push(this.socketTemplate(socket, false));
        }

        if (this.minimal) {
            return html`
        <div class="title minimal" ?singlechar="${this.node.displayCharacter.length === 1}">${this.node.displayCharacter}</div>
        <div class="socket-side inputs">${inputs}</div>
        <div class="socket-side outputs">${outputs}</div>
        `;
        } else {
            return html`
        <div class="title ${this.node.type.toLowerCase()}" @mousedown="${this.startDrag}">${this.node.name || "invalid"}</div>
        <div class="socket-side inputs">${inputs}</div>
        <div class="socket-side outputs">${outputs}</div>
        `;
        }
    }

    public bringToFront() {
        this.style.zIndex = `${this.workspace.topNodeZindex++}`;
    }

    private socketTemplate(socket: NodeSocket, isInputSocket: boolean) {
        let color = "null";

        switch (socket.type) {
            case NodeDataType.ANY: color = "var(--any)"; break;
            case NodeDataType.NUMBER: color = "var(--number)"; break;
            case NodeDataType.BOOLEAN: color = "var(--boolean)"; break;
            case NodeDataType.STRING: color = "var(--string)"; break;
            case NodeDataType.COLOR: color = "var(--color)"; break;
        }

        const md = (e: MouseEvent) => {
            if (e.buttons !== 1) { return; }
            IdentityDomLink.map[socket.id] = (e.target as HTMLElement);
            if (project.isCurrentlyConnecting) { return; }
            project.startConnectionDrag(e, socket, isInputSocket);
            e.stopPropagation();
            e.stopImmediatePropagation();
        };

        const mu = (e: MouseEvent) => {
            IdentityDomLink.map[socket.id] = (e.target as HTMLElement);
            project.endConnectionDrag(e, socket, isInputSocket);
            if (e.buttons !== 1) { return; }
            e.stopPropagation();
            e.stopImmediatePropagation();
        };

        return html`<div @mousedown="${md}" @mouseup="${mu}" class="socket"><div class="circle" style="background: ${color}"></div></div>`;
    }

    private startDrag = (e: MouseEvent) => {
        if (e.buttons !== 1) { return; }

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
        this.dispatchEvent(new CustomEvent("dragged"));
    }

    private stopDrag = (e: MouseEvent) => {
        window.removeEventListener("mouseup", this.stopDrag);
        window.removeEventListener("mousemove", this.onDrag);
    }
}
