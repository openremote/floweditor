import { LitElement, html, customElement, css, property } from "lit-element";
import { Status } from "../models/status";
import { Integration } from "../services/integration";
import { CopyPasteManager } from "../services/copy-paste-manager";
import { Project } from "../services/project";
import { Input } from "../services/input";
import { ModalService } from "../services/modal";
import { Exporter } from "../services/exporter";
import { Shortcuts } from "../services/shortcuts";

export const integration = new Integration();
export const copyPasteManager = new CopyPasteManager();
export const project = new Project();
export const input = new Input();
export const modal = new ModalService();
export const exporter = new Exporter();
export const shortcuts = new Shortcuts();
export const newIds: Set<string> = new Set<string>();

@customElement("flow-editor")
export class FlowEditor extends LitElement {
    @property({ type: Boolean, reflect: true }) public showHeader;
    @property({ type: Boolean, reflect: true }) public showNodePanel;

    constructor() {
        super();
        window.addEventListener("load", () => {
            integration.initialise();
        });
    }

    static get styles() {
        return css`
        :host{
            width: 100vw;
            height: 100vh;
            display: grid;
            grid-template-columns: var(--node-panel-width) 1fr;
            grid-template-rows: var(--topbar-height) 1fr;
            grid-template-areas: 
                "topbar topbar"
                "node-panel workspace";
        }`;
    }

    protected firstUpdated() {
        this.id = "app";
        integration.addListener("initialise", () => {
            this.requestUpdate();
        });
    }

    protected render() {
        if (integration.status === Status.Idle || integration.status === Status.Loading) { return html``; }

        if (this.showHeader) {
            this.style.gridTemplateAreas = `
            "topbar topbar"
            "node-panel workspace"
            `;
        } else {
            this.style.gridTemplateAreas = `
            "node-panel workspace"
            "node-panel workspace"
            `;
        }

        if (!this.showHeader) {
            this.style.gridTemplateAreas = this.style.gridTemplateAreas.replace("topbar topbar", "node-panel workspace");
        }
        if (!this.showNodePanel) {
            this.style.gridTemplateAreas = this.style.gridTemplateAreas.replace(/node-panel/g, "workspace");
        }

        if (integration.status === Status.Success) {
            return html`
            <editor-workspace id="workspace" style="grid-area: workspace"></editor-workspace>
            ${(this.showNodePanel ? html`<node-panel style="grid-area: node-panel" .nodes= "${integration.nodes}"></node-panel>` : null)}
            ${(this.showHeader ? html`<top-bar style="grid-area: topbar"></top-bar>` : null)}
            <context-menu></context-menu>
            <popup-modal id="popup-modal"></popup-modal>
        `;
        } else {
            return html`${integration.openremote.error}`;
        }
    }
}
