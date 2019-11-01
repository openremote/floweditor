import { LitElement, html, customElement, css, property, TemplateResult } from "lit-element";
import { ConnectionLine, ContextMenu, FlowNode, Camera, project, input } from "..";
import { Node, NodeSocket } from "@openremote/model";
import { IdentityDomLink } from "node-structure";
import { List } from "linqts";
import { OrAssetTree, OrAssetTreeRequestSelectEvent } from "@openremote/or-asset-tree";
import { ContextMenuEntry, ContextMenuButton, ContextMenuSeparator } from "..";
import manager from "@openremote/core";
import { FlowNodeSocket } from "./flow-node-socket";

@customElement("editor-workspace")
export class EditorWorkspace extends LitElement {
    @property({ attribute: false, reflect: true }) public camera: Camera = { x: 0, y: 0, zoom: 1 };

    @property({ attribute: false }) public topNodeZindex = 1;

    @property({ attribute: false }) private connectionDragging = false;
    @property({ attribute: false }) private connectionFrom: { x: number, y: number } = { x: 0, y: 0 };
    @property({ attribute: false }) private connectionTo: { x: number, y: number } = { x: 0, y: 0 };

    private isPanning = false;

    private readonly scrollSensitivity = 1.25;
    private readonly zoomLowerBound = .2;
    private readonly zoomUpperBound = 10;
    private readonly renderBackground = false;
    private nodeElements: TemplateResult[] = [];

    private cachedClientRect: ClientRect;
    public get clientRect() {
        return this.cachedClientRect;
    }

    constructor() {
        super();
        project.addListener("nodeadded", (n: Node) => {
            this.nodeElements.push(html`<flow-node @dragged="${() => this.dispatchEvent(new CustomEvent("nodemove"))}" .node="${n}" .workspace="${this}"></flow-node>`);
            this.requestUpdate();
        });

        project.addListener("noderemoved", (n: Node) => {
            this.requestUpdate();
        });

        project.addListener("cleared", () => {
            this.nodeElements = [];
            this.requestUpdate();
        });

        project.addListener("connectionstart", (e: MouseEvent, s: NodeSocket) => {
            if (e.buttons !== 1) { return; }
            const pos = (IdentityDomLink.map[s.id] as FlowNodeSocket).connectionPosition;
            this.connectionFrom = this.pageToOffset(pos);
            this.addEventListener("mousemove", project.connectionDragging);

            this.addEventListener("mouseup", (ee: MouseEvent) => {
                if (project.isCurrentlyConnecting) {
                    project.endConnectionDrag(ee, null, false);
                }
            });
        });

        project.addListener("connecting", (e: MouseEvent) => {
            this.connectionTo = { x: e.pageX - this.clientRect.left, y: e.pageY - this.clientRect.top };
            this.connectionDragging = true;
        });

        project.addListener("connectionend", () => {
            this.connectionDragging = false;
            this.removeEventListener("mousemove", project.connectionDragging);
        });

        window.addEventListener("resize", () => {
            this.cachedClientRect = this.getBoundingClientRect();
            this.dispatchEvent(new CustomEvent("pan"));
        });

        this.addEventListener("mousedown", (e) => {
            this.startPan(e);
            if (e.buttons === 1) {
                input.clearSelection();
            }
        });

        this.addEventListener("contextmenu", (e) => {
            const selectedNodes = input.selected.filter((s) => s instanceof FlowNode) as FlowNode[];
            const selectedConnections = input.selected.filter((s) => s instanceof ConnectionLine) as ConnectionLine[];

            const buttons: (ContextMenuButton | ContextMenuSeparator)[] = [
                {
                    type: "button",
                    icon: "delete",
                    label: "Delete node",
                    action: () => selectedNodes.forEach((n) => project.removeNode(n.node)),
                    disabled: selectedNodes.length === 0
                },
                {
                    type: "button",
                    icon: "content-cut",
                    label: "Cut connection",
                    action: () => selectedConnections.forEach((n) => project.removeConnection(n.connection)),
                    disabled: selectedConnections.length === 0
                },
                { type: "separator" },
                {
                    type: "button",
                    icon: "fit-to-page-outline",
                    label: "Fit view to selected nodes",
                    action: () => this.fitCamera(selectedNodes.map((n) => n.node)),
                    disabled: selectedNodes.length === 0
                },
            ];
            ContextMenu.open(e.pageX, e.pageY, this, buttons);
            e.preventDefault();
        });
        project.workspace = this;
        this.addEventListener("wheel", this.onZoom, { passive: true });
    }

    static get styles() {
        return css`
        :host{
            background: whitesmoke;
            position: relative;
            overflow: hidden;
            box-shadow: rgba(0, 0, 0, 0.2) 0 0 4px inset;
        }

        .view-options{
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            flex-direction: row;
        }

        .button{
            padding: 10px;
            margin: 10px 10px 0 0;
            cursor:pointer;
            background: rgba(0,0,0,0.02);
        }

        or-input[type=button]
        {
            margin: 10px 10px 0 0;
            color: inherit;
        }
        
        .button:hover{
            background: rgba(0,0,0,0.04);
        }
        
        .button:active{
            background: rgba(0,0,0,0.06);
        }

        svg, connection-container {
            pointer-events: none;
            position: absolute;
            display: block;
            right: 0;
            top: 0;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            stroke-width: 4px;
            stroke: rgb(80,80,80);
        }
        `;
    }

    protected firstUpdated() {
        this.cachedClientRect = this.getBoundingClientRect();
    }

    protected render() {
        this.style.backgroundImage = this.renderBackground ? "url('src/grid.png')" : null;
        return html`
        ${this.nodeElements}
        <!-- ${project.nodes.map((n) => html`<flow-node @dragged="${() => this.dispatchEvent(new CustomEvent("nodemove"))}" .node="${n}" .workspace="${this}"></flow-node>`)} -->
        <connection-container .workspace="${this}"></connection-container>
        <svg>
            <line style="display: 
            ${this.connectionDragging ? null : `none`}; 
            stroke-dasharray: ${20 * this.camera.zoom}, ${10 * this.camera.zoom}; 
            stroke-opacity: 0.25; stroke-width: ${this.camera.zoom * 4}px" 

            x1="${this.connectionFrom.x}" 
            y1="${this.connectionFrom.y}" 
            x2="${this.connectionTo.x}" 
            y2="${this.connectionTo.y}"></line>
        </svg>
        <selection-box .workspace="${this}"></selection-box>
        <div class="view-options" style="z-index: ${this.topNodeZindex + 1}">
            ${!this.isCameraInDefaultPosition ? html`<or-input type="button" icon="vector-square" @click="${this.resetCamera}" label="Reset view"></or-input>` : null}
            ${project.nodes.length !== 0 ? html`<or-input type="button" icon="fit-to-page-outline" @click="${() => this.fitCamera(project.nodes)}" label="Fit view"></or-input>` : null}
        </div>
        <!-- <div class="view-options" style="z-index: ${this.topNodeZindex + 1}">
            ${!this.isCameraInDefaultPosition ? html`<div class="button" @click="${this.resetCamera}">Reset view</div>` : null}
            ${project.nodes.length !== 0 ? html`<div class="button" @click="${() => this.fitCamera(project.nodes)}">Fit view</div>` : null}
        </div> -->
        <!-- <div style="z-index: 500; padding: 5px; position: absolute">
            x: ${this.camera.x} <br>
            y: ${this.camera.y} <br>
            zoom: ${this.camera.zoom} <br>
        </div> -->
        `;
    }

    public resetCamera() {
        this.camera = { x: 0, y: 0, zoom: 1 };
        this.dispatchEvent(new CustomEvent("pan"));
        this.dispatchEvent(new CustomEvent("zoom"));
        this.updateBackground();
    }

    public fitCamera(nodes: Node[]) {
        const padding = 25;

        const enumerable = new List<Node>(nodes);
        const XouterleastNode = enumerable.OrderBy((a) => a.position.x).First() as Node;
        const YouterleastNode = enumerable.OrderBy((a) => a.position.y).First() as Node;

        const XoutermostNode = enumerable.OrderByDescending((a) => a.position.x + (IdentityDomLink.map[a.id] as FlowNode).scrollWidth).First() as Node;
        const YoutermostNode = enumerable.OrderByDescending((a) => a.position.y + (IdentityDomLink.map[a.id] as FlowNode).scrollHeight).First() as Node;

        const XoutermostWidth = (IdentityDomLink.map[XoutermostNode.id] as FlowNode).scrollWidth;
        const YoutermostHeight = (IdentityDomLink.map[YoutermostNode.id] as FlowNode).scrollHeight;

        const fitBounds = {
            left: XouterleastNode.position.x - padding,
            right: XoutermostNode.position.x + padding + XoutermostWidth,
            top: YoutermostNode.position.y + padding + YoutermostHeight,
            bottom: YouterleastNode.position.y - padding,
        };
        const fitWidth = fitBounds.right - fitBounds.left;
        const fitHeight = fitBounds.top - fitBounds.bottom;

        const totalBounds = this.clientRect;
        const center = {
            x: (fitBounds.left + fitBounds.right) / 2.0,
            y: (fitBounds.top + fitBounds.bottom) / 2.0
        };
        const targetZoom = Math.min(
            totalBounds.width / fitWidth,
            totalBounds.height / fitHeight
        );

        this.camera = {
            x: -center.x,
            y: -center.y,
            zoom: Math.min(Math.max(this.zoomLowerBound, targetZoom), this.zoomUpperBound)
        };
        this.dispatchEvent(new CustomEvent("pan"));
        this.dispatchEvent(new CustomEvent("zoom"));
        this.updateBackground();
    }

    public offsetToWorld(point: { x?: number, y?: number }) {
        const halfSize = this.halfSize;
        return {
            x: (point.x - halfSize.x) / this.camera.zoom - this.camera.x,
            y: (point.y - halfSize.y) / this.camera.zoom - this.camera.y
        };
    }

    public worldToOffset(point: { x?: number, y?: number }) {
        const halfSize = this.halfSize;
        return {
            x: (point.x + this.camera.x) * this.camera.zoom + halfSize.x,
            y: (point.y + this.camera.y) * this.camera.zoom + halfSize.y
        };
    }

    public pageToOffset(point: { x?: number, y?: number }) {
        const box = this.clientRect;
        return {
            x: point.x - box.left,
            y: point.y - box.top
        };
    }

    public get halfSize() {
        const box = this.cachedClientRect;
        return { x: box.width / 2, y: box.height / 2 };
    }

    private startPan(event: MouseEvent) {
        if (this.connectionDragging) { return; }
        if (event.buttons !== 4) { return; }
        this.isPanning = true;
        window.addEventListener("mousemove", this.onMove);
        window.addEventListener("mouseup", this.stopPan);
    }

    private onMove = (event: MouseEvent) => {
        const documentZoom = window.devicePixelRatio;
        this.camera = {
            x: this.camera.x + event.movementX / this.camera.zoom / documentZoom,
            y: this.camera.y + event.movementY / this.camera.zoom / documentZoom,
            zoom: this.camera.zoom
        };

        this.dispatchEvent(new CustomEvent("pan"));
        this.updateBackground();
    }

    private onZoom = (event: WheelEvent) => {
        if (this.connectionDragging) { return; }
        if (this.isPanning) { return; }
        const magnification = 0.9 * this.scrollSensitivity;
        const rz = event.deltaY < 0 ? this.camera.zoom * magnification : this.camera.zoom / magnification;
        if (rz < this.zoomLowerBound || rz > this.zoomUpperBound) { return; }

        this.camera = {
            x: this.camera.x,
            y: this.camera.y,
            zoom: rz
        };

        this.dispatchEvent(new CustomEvent("zoom"));
        this.updateBackground();
    }

    private stopPan = () => {
        if (!this.isPanning) { return; }
        window.removeEventListener("mousemove", this.onMove);
        this.isPanning = false;
    }

    private get isCameraInDefaultPosition() {
        const errorMargin = 0.05;
        return (Math.abs(this.camera.x) < errorMargin && Math.abs(this.camera.y) < errorMargin && this.camera.zoom > (1 - errorMargin) && this.camera.zoom < (1 + errorMargin));
    }

    private updateBackground() {
        if (!this.renderBackground) { return; }
        const halfSize = this.halfSize;
        this.style.backgroundSize = `${this.camera.zoom * 256}px`;
        this.style.backgroundPosition = `${this.camera.x * this.camera.zoom + halfSize.x}px ${this.camera.y * this.camera.zoom + halfSize.y}px`;
    }
}
