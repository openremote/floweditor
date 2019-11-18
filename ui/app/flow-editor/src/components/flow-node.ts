import { html, customElement, css, property } from "lit-element";
import { Node, NodeSocket } from "@openremote/model";
import { IdentityDomLink } from "node-structure";
import { EditorWorkspace, SelectableElement, project, newIds } from "..";
import { FlowNodeStyle } from "../styles/flow-node-style";
import { i18next } from "@openremote/or-translate";
import { nodeConverter } from "../converters/node-converter";

@customElement("flow-node")
export class FlowNode extends SelectableElement {
    @property({ converter: nodeConverter }) public node: Node;
    @property({ attribute: false }) public workspace: EditorWorkspace;

    @property({ type: Boolean, reflect: true }) private minimal = false;
    @property({ attribute: false }) private isBeingDragged = false;

    constructor() {
        super();
    }

    protected async firstUpdated() {
        super.firstUpdated();
        this.linkIdentity();
        this.workspace.addEventListener("pan", this.setTranslate);
        this.workspace.addEventListener("zoom", this.setTranslate);
        project.addListener("cleared", this.forceUpdate);
        project.addListener("connectionremoved", this.linkIdentity);
        this.minimal = (this.node.displayCharacter || "").length !== 0;
        this.bringToFront();
        if (newIds.has(this.node.id)) { // node centering has to keep track of which nodes were created by the user
            await this.updateComplete;
            await this.updateComplete;
            const size = this.getBoundingClientRect();
            this.node.position.x -= size.width / 2 / this.workspace.camera.zoom;
            this.node.position.y -= size.height / 2 / this.workspace.camera.zoom;
            this.setTranslate();
            newIds.delete(this.node.id);
        }
        if (this.minimal) {
            this.addEventListener("mousedown", this.startDrag);
        }
    }

    private forceUpdate = () => { this.requestUpdate(); };

    static get styles() {
        return FlowNodeStyle;
    }

    public disconnectedCallback() {
        this.workspace.removeEventListener("pan", this.setTranslate);
        this.workspace.removeEventListener("zoom", this.setTranslate);
        project.removeListener("cleared", this.forceUpdate);
        project.removeListener("connectionremoved", this.linkIdentity);
        super.disconnectedCallback();
    }

    protected async updated() {
        this.linkIdentity();
        this.dispatchEvent(new CustomEvent("updated"));
    }

    protected render() {
        if (this.minimal) {
            this.style.background = `var(--${this.node.type.toLowerCase()}-color)`;
        } else {
            this.style.background = null;
        }

        this.setTranslate();
        this.style.boxShadow = this.selected ? "var(--highlight) 0 0 0 3px" : null;

        const title = this.minimal ?
            html`<div class="title minimal" ?singlechar="${this.node.displayCharacter.length === 1}">${i18next.t(this.node.displayCharacter)}</div>` :
            html`<div class="title ${this.node.type.toLowerCase()}" @mousedown="${this.startDrag}">${i18next.t(this.node.name) || "invalid"}</div>`;

        const inputSide = html`<div class="socket-side inputs">${this.node.inputs.map((i) => html`<flow-node-socket ?renderlabel="${!this.minimal}" .socket="${i}" side="input"></flow-node-socket>`)}</div>`;
        const outputSide = html`<div class="socket-side outputs">${this.node.outputs.map((i) => html`<flow-node-socket ?renderlabel="${!this.minimal}" .socket="${i}" side="output"></flow-node-socket>`)}</div>`;
        const spacer = html`<div style="width: 10px"></div>`;
        return html`
        ${title}
        ${this.node.inputs.length > 0 ? inputSide : spacer}
        ${(this.minimal) ? null : html`<div class="internal-container">${this.node.internals.map((i) =>
            html`<internal-picker @picked="${async () => {
                project.unsavedState = true;
                await this.updateComplete;
                this.dispatchEvent(new CustomEvent("updated"));
            }}" .node="${this.node}" .internalIndex="${this.node.internals.indexOf(i)}"></internal-picker>`)}</div>`}
        ${this.node.outputs.length > 0 ? outputSide : spacer}
        `;
    }

    private setTranslate = () => {
        const pos = this.workspace.worldToOffset(this.node.position);
        this.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${this.workspace.camera.zoom})`;
        this.dispatchEvent(new CustomEvent("updated"));
    }

    public bringToFront() {
        this.style.zIndex = `${this.workspace.topNodeZindex++}`;
    }

    private startDrag = (e: MouseEvent) => {
        if (e.buttons !== 1) { return; }
        this.bringToFront();
        window.addEventListener("mouseup", this.stopDrag);
        window.addEventListener("mousemove", this.onDrag);
        this.isBeingDragged = true;
    }

    private onDrag = (e: MouseEvent) => {
        this.node.position = {
            x: this.node.position.x + e.movementX / this.workspace.camera.zoom,
            y: this.node.position.y + e.movementY / this.workspace.camera.zoom
        };
        this.setTranslate();
        project.unsavedState = true;
        this.dispatchEvent(new CustomEvent("dragged"));
    }

    private stopDrag = () => {
        window.removeEventListener("mouseup", this.stopDrag);
        window.removeEventListener("mousemove", this.onDrag);
        this.isBeingDragged = false;
    }

    private linkIdentity = () => {
        IdentityDomLink.map[this.node.id] = this;
    }
}
