import { LitElement, html, customElement, css, property } from "lit-element";
import { Camera } from "../models/camera";
import { project } from "..";
import { Node } from "@openremote/model";
import { IdentityDomLink } from "node-structure";
import { FlowNode } from "./flow-node";

@customElement("editor-workspace")
export class EditorWorkspace extends LitElement {
    @property({ attribute: false, reflect: true }) public camera: Camera = {
        x: 0, y: 0, zoom: 1
    };

    private isPanning = false;

    private readonly scrollSensitivity = 1.25;
    private readonly zoomLowerBound = .2;
    private readonly zoomUpperBound = 10;
    private readonly renderBackground = false;

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

        window.addEventListener("resize", () => {
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
        `;
    }

    public render() {
        this.style.backgroundImage = this.renderBackground ? "url('src/grid.png')" : null;
        const nodeElements = project.nodes.Select((n) => html`<flow-node .node="${n}" .workspace="${this}"></flow-node>`).ToArray();
        return html`
        ${nodeElements}
        <div class="view-options">
            <div class="button" @click="${this.resetCamera}">Reset view</div>
            ${project.nodes.Any() ? html`<div class="button" @click="${this.fitCamera}">Fit view</div>` : null}
        </div>
        <!-- debug stuff -->
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
        
        const XoutermostNode = project.nodes.OrderByDescending((n) => n.position.x).ToArray()[0] as Node;
        const XoutermostWidth = (IdentityDomLink.map[XoutermostNode.id] as FlowNode).scrollWidth;
        const YoutermostNode = project.nodes.OrderByDescending((n) => n.position.y).ToArray()[0] as Node;
        const YoutermostHeight = (IdentityDomLink.map[YoutermostNode.id] as FlowNode).scrollHeight;

        const fitBounds = {
            left: project.nodes.Min((n) => n.position.x) - padding,
            right: XoutermostNode.position.x + padding + XoutermostWidth,
            top: project.nodes.Max((n) => n.position.y) + padding + YoutermostHeight,
            bottom: project.nodes.Min((n) => n.position.y) - padding,
        };
        const fitWidth = fitBounds.right - fitBounds.left;
        const fitHeight = fitBounds.top - fitBounds.bottom;

        const totalBounds = this.getBoundingClientRect();
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

    public screenToWorld(point: { x?: number, y?: number }) {
        const halfSize = this.halfSize;
        return {
            x: (point.x - halfSize.x) / this.camera.zoom - this.camera.x,
            y: (point.y - halfSize.y) / this.camera.zoom - this.camera.y
        };
    }

    public worldToScreen(point: { x?: number, y?: number }) {
        const halfSize = this.halfSize;
        return {
            x: (point.x + this.camera.x) * this.camera.zoom + halfSize.x,
            y: (point.y + this.camera.y) * this.camera.zoom + halfSize.y
        };
    }

    public get halfSize() {
        const box = this.getBoundingClientRect();
        return { x: box.width / 2, y: box.height / 2 };
    }

    private startPan(event: MouseEvent) {
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
        this.style.backgroundSize = `${this.camera.zoom * 128}px`;
        this.style.backgroundPosition = `${this.camera.x * this.camera.zoom + halfSize.x}px ${this.camera.y * this.camera.zoom + halfSize.y}px`;
    }
}
