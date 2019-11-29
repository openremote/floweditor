import { LitElement, html, customElement, property } from "lit-element";
import { repeat } from "lit-html/directives/repeat";
import { Node, NodeSocket, NodeType } from "@openremote/model";
import { IdentityDomLink, CopyMachine } from "node-structure";
import { List } from "linqts";
import { FlowNodeSocket } from "./flow-node-socket";
import { LightNodeCollection } from "../models/light-node-collection";
import { EditorWorkspaceStyle } from "../styles/editor-workspace-style";
import { i18next } from "@openremote/or-translate";
import { FlowNode } from "./flow-node";
import { ConnectionLine } from "./connection-line";
import { ContextMenuButton, ContextMenuSeparator } from "../models/context-menu-button";
import { ContextMenu } from "./context-menu";
import { project, input, copyPasteManager, integration, FlowEditor } from "./flow-editor";
import { Camera } from "../models/camera";
import { Utilities } from "../utils";

@customElement("editor-workspace")
export class EditorWorkspace extends LitElement {
    @property({ attribute: false }) public camera: Camera = { x: 0, y: 0, zoom: 1 };

    @property({ attribute: false }) public topNodeZindex = 1;
    @property({ attribute: false }) public renderBackground = false;
    @property({ attribute: false }) public scrollSensitivity = 1.25;
    @property({ attribute: false }) public zoomLowerBound = .2;
    @property({ attribute: false }) public zoomUpperBound = 10;

    @property({ attribute: false }) public application: FlowEditor;

    @property({ attribute: false }) private connectionDragging = false;
    @property({ attribute: false }) private connectionFrom: { x: number, y: number } = { x: 0, y: 0 };
    @property({ attribute: false }) private connectionTo: { x: number, y: number } = { x: 0, y: 0 };

    private isPanning = false;
    private cachedClientRect: ClientRect;

    public get clientRect() {
        return this.cachedClientRect;
    }

    constructor() {
        super();
        project.addListener("nodeadded", (n: Node) => {
            this.requestUpdate();
        });

        project.addListener("noderemoved", (n: Node) => {
            this.requestUpdate();
        });

        project.addListener("cleared", () => {
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
            const selectedNodes = input.selected.filter((s) => s instanceof FlowNode && s.selected) as FlowNode[];
            const selectedConnections = input.selected.filter((s) => s instanceof ConnectionLine && s.selected) as ConnectionLine[];

            const createNodeButtons = (type: NodeType) => {
                let nB: (ContextMenuButton | ContextMenuSeparator)[] = [
                    {
                        type: "button",
                        label: "",
                        icon: "arrow-left",
                        action: () => { this.dispatchEvent(new MouseEvent("contextmenu", e)); }
                    }
                ];
                nB = nB.concat(integration.nodes.filter((n) => n.type === type).map((node) => {
                    const b: ContextMenuButton = {
                        type: "button",
                        label: i18next.t(node.name, Utilities.humanLike(node.name)),
                        action: () => {
                            const copy = CopyMachine.copy(node);
                            copy.position = this.offsetToWorld({ x: e.offsetX - this.offsetLeft, y: e.offsetY - this.offsetTop });
                            project.addNode(copy);
                        }
                    };
                    return b;
                }));
                return nB;
            };

            let buttons: (ContextMenuButton | ContextMenuSeparator)[] = [
                {
                    type: "button",
                    label: i18next.t("input", "Input"),
                    icon: "arrow-up-thick",
                    action: () => { ContextMenu.open(e.pageX, e.pageY, this, createNodeButtons(NodeType.INPUT)); }
                },
                {
                    type: "button",
                    label: i18next.t("processors", "Processors"),
                    icon: "settings",
                    action: () => { ContextMenu.open(e.pageX, e.pageY, this, createNodeButtons(NodeType.PROCESSOR)); }
                },
                {
                    type: "button",
                    label: i18next.t("output", "Ouput"),
                    icon: "arrow-down-thick",
                    action: () => { ContextMenu.open(e.pageX, e.pageY, this, createNodeButtons(NodeType.OUTPUT)); }
                },
            ];

            buttons = buttons.concat([
                { type: "separator" },
                {
                    type: "button",
                    icon: "content-copy",
                    label: i18next.t("copy", "Copy"),
                    action: () => {
                        const pos = this.offsetToWorld({ x: e.offsetX, y: e.offsetY });
                        this.copy(pos.x, pos.y);
                    },
                    disabled: selectedNodes.length === 0
                },
                {
                    type: "button",
                    icon: "content-paste",
                    label: i18next.t("paste", "Paste"),
                    action: () => {
                        const pos = this.offsetToWorld({ x: e.offsetX, y: e.offsetY });
                        this.paste(pos.x, pos.y);
                    },
                    disabled: copyPasteManager.isFull
                },
                {
                    type: "button",
                    icon: "delete",
                    label: i18next.t("delete", "Delete"),
                    action: () => {
                        selectedNodes.forEach((n) => {
                            if (n.frozen) { return; }
                            project.removeNode(n.node);
                        }); 
                        selectedConnections.forEach((n) => project.removeConnection(n.connection));
                    },
                    disabled: (selectedNodes.length === 0 && selectedConnections.length === 0) || (selectedNodes.every((n) => n.frozen))
                },
                { type: "separator" },
                {
                    type: "button",
                    icon: "fit-to-page-outline",
                    label: i18next.t("fitViewToSelectedNodes", "Fit view to selected nodes"),
                    action: () => this.fitCamera(selectedNodes.map((n) => n.node)),
                    disabled: selectedNodes.length === 0
                },
                // {
                //     type: "button",
                //     icon: "snowflake",
                //     label: "TOGGLE FROZEN",
                //     action: () => selectedNodes.forEach((n) => n.frozen = !n.frozen),
                //     disabled: selectedNodes.length === 0
                // },
            ]);

            ContextMenu.open(e.pageX, e.pageY, this, buttons);
            e.preventDefault();
        });
        project.workspace = this;
        this.addEventListener("wheel", this.onZoom, { passive: true });
    }

    private async paste(x: number, y: number) {
        const clone: LightNodeCollection = copyPasteManager.getFromClipboard({ x, y });
        clone.nodes.forEach((n) => {
            project.addNode(n);
        });
        await this.updateComplete;
        clone.connections.forEach((c) => {
            project.createConnection(c.from, c.to);
        });
    }

    private copy(x: number, y: number) {
        const selectedNodes = input.selected.filter((s) => s instanceof FlowNode && s.selected) as FlowNode[];
        const selectedConnections = input.selected.filter((s) => s instanceof ConnectionLine && s.selected) as ConnectionLine[];
        copyPasteManager.putInClipboard({
            nodes: selectedNodes.map((n) => n.node),
            connections: selectedConnections.map((c) => c.connection)
        }, { x, y });
    }

    static get styles() {
        return EditorWorkspaceStyle;
    }

    protected firstUpdated() {
        this.cachedClientRect = this.getBoundingClientRect();
        this.application.nodePanel.drawer.addEventListener("or-mwc-drawer-changed", async (e: any) => {
            this.style.width = e.detail ? "calc(100vw - 255px)" : null;
            await this.updateComplete;
            this.cachedClientRect = this.getBoundingClientRect();
            this.dispatchEvent(new CustomEvent("pan"));
            this.updateBackground();
        });
    }

    protected render() {
        this.style.backgroundImage = this.renderBackground ? "url('src/grid.png')" : null;
        return html`
        ${repeat(
            project.nodes,
            (i) => i.id,
            (n) => html`<flow-node .node="${n}" .workspace="${this}"></flow-node>`)}
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
            ${!this.isCameraInDefaultPosition ? html`<or-input type="button" icon="vector-square" @click="${this.resetCamera}" label="${i18next.t("resetView", "Reset view")}"></or-input>` : null}
            ${project.nodes.length !== 0 ? html`<or-input type="button" icon="fit-to-page-outline" @click="${() => this.fitCamera(project.nodes)}" label="${i18next.t("fitView", "Fit view")}"></or-input>` : null}
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

    public fitCamera(nodes: Node[], padding = 25) {
        const enumerable = new List<Node>();
        enumerable.AddRange(nodes);
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
        if (this.connectionDragging) { return false; }
        if (event.buttons !== 4) { return false; }
        this.isPanning = true;
        window.addEventListener("mousemove", this.onMove);
        window.addEventListener("mouseup", this.stopPan);
        event.preventDefault();
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
