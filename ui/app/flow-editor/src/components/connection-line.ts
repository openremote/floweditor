import { html, customElement, css, property } from "lit-element";
import { NodeSocket, NodeConnection } from "@openremote/model";
import { IdentityDomLink, IdentityAssigner } from "node-structure";
import { Utilities, SelectableElement, EditorWorkspace, FlowNode, project } from "..";

@customElement("connection-line")
export class ConnectionLine extends SelectableElement {
    @property({ attribute: false }) public connection: NodeConnection;
    @property({ attribute: false }) public workspace: EditorWorkspace;

    @property({ type: String }) private polylineId: string;

    private fromNodeElement: FlowNode;
    private toNodeElement: FlowNode;

    private fromElement: HTMLElement;
    private toElement: HTMLElement;

    private readonly fancyLine = false;

    constructor() {
        super();
        this.polylineId = IdentityAssigner.generateIdentity();
    }

    public static get styles() {
        return css`
            svg{
                fill: none;  
                overflow: visible;
                position: absolute;
                pointer-events: none;
                stroke-linejoin: round;
            }
            
            polyline, line{
                position: absolute;
                pointer-events: all;
            }
            
            polyline:hover, line:hover, polyline[selected = true], line[selected = true]{
                stroke: var(--highlight);
            }

            text{
                fill: red;
                stroke: none;
            }
        `;
    }

    protected firstUpdated() {
        this.setHandle(this.shadowRoot.getElementById(this.polylineId));
        project.addListener("connectionremoved", this.nodeChanged);
    }

    private nodeChanged = () => { this.requestUpdate(); };

    protected render() {
        if (this.fromNodeElement) { this.fromNodeElement.removeEventListener("updated", this.nodeChanged); }
        if (this.toNodeElement) { this.toNodeElement.removeEventListener("updated", this.nodeChanged); }

        this.fromNodeElement = IdentityDomLink.map[this.connection.from.nodeId];
        this.toNodeElement = IdentityDomLink.map[this.connection.to.nodeId];
        this.fromElement = IdentityDomLink.map[this.connection.from.id];
        this.toElement = IdentityDomLink.map[this.connection.to.id];

        if (!this.fromNodeElement || !this.toNodeElement || !this.fromElement || !this.toElement) {
            console.warn("Attempt to render invalid connection");
            return html``;
        }

        this.fromNodeElement.addEventListener("updated", this.nodeChanged);
        this.toNodeElement.addEventListener("updated", this.nodeChanged);

        const parentSize = this.workspace.clientRect;
        const from = Utilities.getCenter(this.fromElement.getBoundingClientRect());
        const to = Utilities.getCenter(this.toElement.getBoundingClientRect());
        const totalWidth = Math.min(Math.abs(from.x - to.x), 256 * this.workspace.camera.zoom);

        return html`<svg style="stroke-width: ${this.workspace.camera.zoom * (this.selected ? 6 : 4)}px;"><polyline id="${this.polylineId}"
        selected="${this.selected}"
        points="
        ${from.x - parentSize.left}, ${from.y - parentSize.top} 
        ${this.fancyLine ? `${from.x - parentSize.left + totalWidth / 4}, ${from.y - parentSize.top} ${to.x - parentSize.left - totalWidth / 4}, ${to.y - parentSize.top}` : ``}
        ${to.x - parentSize.left}, ${to.y - parentSize.top}"
        ></polyline>
        <!-- <text x="${(from.x + to.x) / 2 - parentSize.left}" y="${(from.y + to.y) / 2 - parentSize.top}">${this.connection.from.nodeId} -> ${this.connection.to.nodeId}</text> -->
        </svg>`;
    }
}
