import { LitElement, html, customElement, css, property } from "lit-element";
import { Camera } from "../models/camera";
import { project } from "..";
import { Node, NodeSocket } from "@openremote/model";
import { IdentityDomLink } from "node-structure";
import { FlowNode } from "./flow-node";
import { ConnectionContainer } from "./connection-container";
import { asEnumerable } from "ts-linq";

@customElement("editor-workspace")
export class EditorWorkspace extends LitElement {
    @property({ attribute: false, reflect: true }) public camera: Camera = {
        x: 0, y: 0, zoom: 1
    };

    @property({ attribute: false }) public topNodeZindex = 1;

    @property({ attribute: false }) private connectionDragging = false;
    @property({ attribute: false }) private connectionFrom: { x: number, y: number } = { x: 0, y: 0 };
    @property({ attribute: false }) private connectionTo: { x: number, y: number } = { x: 0, y: 0 };

    private isPanning = false;

    private readonly scrollSensitivity = 1.25;
    private readonly zoomLowerBound = .2;
    private readonly zoomUpperBound = 10;
    private readonly renderBackground = false;

    private cachedClientRect: ClientRect;
    public get clientRect() {
        return this.cachedClientRect;
    }

    constructor() {
        super();
        project.addListener("nodeadded", () => {
            this.requestUpdate();
        });

        project.addListener("noderemoved", () => {
            this.requestUpdate();
        });

        project.addListener("cleared", () => {
            this.requestUpdate();
        });

        project.addListener("connectionstart", (e: MouseEvent, s: NodeSocket) => {
            if (e.buttons !== 1) { return; }
            const socketBox = (IdentityDomLink.map[s.id] as HTMLElement).getBoundingClientRect();
            this.connectionFrom = this.pageToOffset({ x: socketBox.left + socketBox.width / 2, y: socketBox.top + socketBox.height / 2 });
            this.addEventListener("mousemove", project.connectionDragging);

            this.addEventListener("mouseup", (ee: MouseEvent) => {
                if (project.isCurrentlyConnecting) {
                    project.endConnectionDrag(ee, null, false);
                }
            });

        });

        project.addListener("connecting", (e: MouseEvent) => {
            this.connectionTo = { x: e.offsetX, y: e.offsetY };
            this.connectionDragging = true;
        });

        project.addListener("connectionend", (e: MouseEvent) => {
            this.connectionDragging = false;
            this.removeEventListener("mousemove", project.connectionDragging);
        });

        window.addEventListener("resize", () => {
            this.cachedClientRect = this.getBoundingClientRect();
            this.dispatchEvent(new CustomEvent("pan"));
        });

        this.addEventListener("mousedown", this.startPan);
        this.addEventListener("wheel", this.onZoom);
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

    public firstUpdated() {
        this.cachedClientRect = this.getBoundingClientRect();
    }

    public render() {
        this.style.backgroundImage = this.renderBackground ? "url('src/grid.png')" : null;
        this.style.strokeWidth = `${this.camera.zoom * 4}px`;

        const nodeElements = [];

        for (const n of project.nodes) {
            nodeElements.push(html`<flow-node @dragged="${() => this.dispatchEvent(new CustomEvent("nodemove"))}" .node="${n}" .workspace="${this}"></flow-node>`);
        }

        return html`
        ${nodeElements}
        <connection-container .workspace="${this}"></connection-container>
        <svg>
            <line style="display: ${this.connectionDragging ? null : `none`}" x1="${this.connectionFrom.x}" y1="${this.connectionFrom.y}" x2="${this.connectionTo.x}" y2="${this.connectionTo.y}"></line>
        </svg>

        <div class="view-options" style="${this.topNodeZindex + 1}">
            <div class="button" @click="${this.resetCamera}">Reset view</div>
            ${project.nodes.length !== 0 ? html`<div class="button" @click="${this.fitCamera}">Fit view</div>` : null}
        </div>
        <div style="z-index: 500; padding: 5px; position: absolute">
            x: ${this.camera.x} <br>
            y: ${this.camera.y} <br>
            zoom: ${this.camera.zoom} <br>
        </div>
        `;
    }

    public resetCamera() {
        this.camera = { x: 0, y: 0, zoom: 1 };
        this.dispatchEvent(new CustomEvent("pan"));
        this.dispatchEvent(new CustomEvent("zoom"));
        this.updateBackground();
    }

    public fitCamera() {
        const padding = 25;

        const enumerable = asEnumerable(project.nodes);
        const XouterleastNode = enumerable.OrderBy((a) => a.position.x).First() as Node;
        const YouterleastNode = enumerable.OrderBy((a) => a.position.y).First() as Node;

        const XoutermostNode = enumerable.OrderByDescending((a) => a.position.x).First() as Node;
        const YoutermostNode = enumerable.OrderByDescending((a) => a.position.y).First() as Node;

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

    private stopPan = (event: MouseEvent) => {
        if (!this.isPanning) { return; }
        window.removeEventListener("mousemove", this.onMove);
        this.isPanning = false;
    }

    private updateBackground() {
        if (!this.renderBackground) { return; }
        const halfSize = this.halfSize;
        this.style.backgroundSize = `${this.camera.zoom * 256}px`;
        this.style.backgroundPosition = `${this.camera.x * this.camera.zoom + halfSize.x}px ${this.camera.y * this.camera.zoom + halfSize.y}px`;
    }
}
