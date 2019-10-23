import { html, customElement, css, property } from "lit-element";
import { NodeSocket } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink, IdentityAssigner } from "node-structure";
import { Utilities, SelectableElement, project } from "..";
import { FlowNode } from "./flow-node";

@customElement("connection-line")
export class ConnectionLine extends SelectableElement {
    @property({ attribute: false }) public from: NodeSocket;
    @property({ attribute: false }) public to: NodeSocket;
    @property({ attribute: false }) public workspace: EditorWorkspace;

    @property({ type: String }) private polylineId: string;
    @property({ attribute: false }) private requiresElementRetrieval = true;

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
                pointer-events: all;
            }
            
            polyline:hover, line:hover, polyline[selected = true], line[selected = true]{
                stroke: var(--highlight);
            }
        `;
    }

    public firstUpdated() {
        const update = () => { this.requestUpdate(); };
        this.workspace.addEventListener("pan", update);
        this.workspace.addEventListener("zoom", update);
        this.workspace.addEventListener("nodemove", update);

        project.addListener("connectioncreated", () => { this.requiresElementRetrieval = true; });
        project.addListener("connectionremoved", () => { this.requiresElementRetrieval = true; });

        this.setHandle(this.shadowRoot.getElementById(this.polylineId));
    }

    public render() {
        if (this.requiresElementRetrieval) {
            this.retrieveElements();
        }

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
        </svg>`;
    }

    private retrieveElements() {
        this.fromNodeElement = IdentityDomLink.map[this.from.nodeId];
        this.toNodeElement = IdentityDomLink.map[this.to.nodeId];

        this.fromElement = IdentityDomLink.map[this.from.id];
        this.toElement = IdentityDomLink.map[this.to.id];
    }
}
