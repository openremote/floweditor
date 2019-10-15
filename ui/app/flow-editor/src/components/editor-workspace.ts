import { LitElement, html, customElement, css, property } from "lit-element";
import { Project } from "../services/project";
import { Camera } from "../models/camera";

@customElement("editor-workspace")
export class EditorWorkspace extends LitElement {
    @property({ attribute: false, reflect: true }) public camera: Camera = {
        x: 0, y: 0, zoom: 1
    };

    private isPanning = false;

    private readonly scrollSensitivity = 1.2;

    constructor() {
        super();
        Project.subscribe("nodeadded", () => {
            this.requestUpdate();
        });

        Project.subscribe("noderemoved", () => {
            this.requestUpdate();
        });

        Project.subscribe("cleared", () => {
            this.requestUpdate();
        });

        this.addEventListener("mousedown", this.startPan);
        this.addEventListener("wheel", this.onZoom);
    }

    static get styles() {
        return css`
        :host{
            background-color: whitesmoke;
            position: relative;
            overflow: hidden;
        }
        `;
    }

    public render() {
        const nodeElements = Project.nodes.Select((n) => html`<flow-node .node="${n}" .camera="${this.camera}" ></flow-node>`).ToArray();
        return html`
        ${nodeElements}
        `;
    }

    private startPan(event: MouseEvent) {
        if (event.buttons !== 4) { return; }
        this.isPanning = true;
        window.addEventListener("mousemove", this.onMove);
        window.addEventListener("mouseup", this.stopPan);
    }

    private onMove = (event: MouseEvent) => {
        this.camera = {
            x: this.camera.x + event.movementX / this.camera.zoom,
            y: this.camera.y + event.movementY / this.camera.zoom,
            zoom: this.camera.zoom
        };
    }

    private onZoom = (event: WheelEvent) => {
        const box = this.getBoundingClientRect();
        const magnification = 0.9 * this.scrollSensitivity;
        const delta = event.deltaY < 0 ? (magnification) : (1 / magnification);
        const scalarDifference = this.camera.zoom - (this.camera.zoom * delta);

        this.camera = {
            x: this.camera.x + scalarDifference * event.clientX,
            y: this.camera.y,
            zoom: this.camera.zoom * delta
        };
    }

    private stopPan = (event: MouseEvent) => {
        if (!this.isPanning) { return; }
        window.removeEventListener("mousemove", this.onMove);
        this.isPanning = false;
    }
}
