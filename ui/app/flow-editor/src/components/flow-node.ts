import { html, customElement, css, property } from "lit-element";
import { Node, NodeSocket } from "@openremote/model";
import { IdentityDomLink } from "node-structure";
import { EditorWorkspace, SelectableElement, project } from "..";

@customElement("flow-node")
export class FlowNode extends SelectableElement {
    @property({ attribute: false }) public node: Node;
    @property({ attribute: false }) public workspace: EditorWorkspace;
    @property({ attribute: false }) private minimal = false;

    private identityDeleted = false;

    constructor() {
        super();
    }

    protected firstUpdated() {
        this.workspace.addEventListener("pan", () => {
            this.requestUpdate();
        });
        this.workspace.addEventListener("zoom", () => {
            this.requestUpdate();
        });
        project.addListener("connectionremoved", () => {
            this.linkIdentity();
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
              
        .inputs{
            grid-area: input;
            align-items: flex-start;
        }
        
        .inputs flow-node-socket{
            transform: translateX(calc(var(--socket-size) / -2));
        }
        
        .outputs{
            grid-area: output;
            align-items: flex-end;
        }
        
        .outputs flow-node-socket{
            transform: translateX(calc(var(--socket-size) / 2));
        }
        
        flow-node-socket{
            border-radius: 100%;
            margin: 0 2px 0 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: none;
            width: var(--socket-size);
            height: var(--socket-size);
        }

        flow-node-socket:hover{
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

    public disconnectedCallback() {
        this.identityDeleted = delete IdentityDomLink.map[this.node.id];
    }

    protected updated() {
        this.linkIdentity();
        this.dispatchEvent(new CustomEvent("updated"));
    }

    protected render() {
        this.minimal = (this.node.displayCharacter || "").length !== 0;
        this.setAttribute("minimal", this.minimal.toString());
        if (this.minimal) {
            this.addEventListener("mousedown", this.startDrag);
            this.style.background = `var(--${this.node.type.toLowerCase()}-color)`;
        } else {
            this.style.background = null;
        }

        const pos = this.workspace.worldToOffset(this.node.position);
        this.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${this.workspace.camera.zoom})`;
        this.style.boxShadow = this.selected ? "var(--highlight) 0 0 0 3px" : null;

        const title = this.minimal ?
            html`<div class="title minimal" ?singlechar="${this.node.displayCharacter.length === 1}">${this.node.displayCharacter}</div>` :
            html`<div class="title ${this.node.type.toLowerCase()}" @mousedown="${this.startDrag}">${this.node.name || "invalid"}</div>`;

        return html`
        ${title}
        <div class="socket-side inputs">${this.node.inputs.map((i) => html`<flow-node-socket .socket="${i}" side="input"></flow-node-socket>`)}</div>
        <div class="socket-side outputs">${this.node.outputs.map((i) => html`<flow-node-socket .socket="${i}" side="output"></flow-node-socket>`)}</div>
        `;
    }

    public bringToFront() {
        this.style.zIndex = `${this.workspace.topNodeZindex++}`;
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

    private stopDrag = () => {
        window.removeEventListener("mouseup", this.stopDrag);
        window.removeEventListener("mousemove", this.onDrag);
    }

    private linkIdentity() {
        if (!this.identityDeleted) {
            IdentityDomLink.map[this.node.id] = this;
        }
    }
}
