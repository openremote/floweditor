import { LitElement, html, customElement, css, query, unsafeCSS } from "lit-element";
import { Status } from "../models/status";
import { Integration } from "../services/integration";
import { CopyPasteManager } from "../services/copy-paste-manager";
import { Project } from "../services/project";
import { Input } from "../services/input";
import { ModalService } from "../services/modal";
import { Exporter } from "../services/exporter";
import { Shortcuts } from "../services/shortcuts";
import { NodePanel } from "./node-panel";
import { EditorWorkspace } from "./editor-workspace";
import { TopBar } from "./top-bar";

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
    constructor() {
        super();
        window.addEventListener("load", () => {
            integration.initialise();
        });
    }

    static get styles() {
        return [
            css`
            :host{
                width: 100vw;
                height: 100vh;
                display: grid;
                grid-template-columns: 1fr auto;
                grid-template-rows: var(--topbar-height) 1fr;
                grid-template-areas: 
                    "topbar topbar"
                    "workspace node-panel";
            }`];
    }

    protected firstUpdated() {
        this.id = "app";
        integration.addListener("initialise", () => {
            this.requestUpdate();
        });
    }

    @query("node-panel") public nodePanel: NodePanel;
    @query("top-bar") public topBar: TopBar;
    @query("editor-workspace") public editorWorkspace: EditorWorkspace;

    protected render() {
        if (integration.status === Status.Idle || integration.status === Status.Loading) { return html``; }

        if (integration.status === Status.Success) {
            return html`
            <top-bar .application="${this}" style="grid-area: topbar"></top-bar>
            <node-panel .application="${this}" style="grid-area: node-panel" .nodes= "${integration.nodes}"></node-panel>
            <editor-workspace .application="${this}" id="workspace" style="grid-area: workspace"></editor-workspace>
            <context-menu></context-menu>
            <popup-modal id="popup-modal"></popup-modal>
        `;
        } else {
            return html`${integration.openremote.error}`;
        }
    }
}
