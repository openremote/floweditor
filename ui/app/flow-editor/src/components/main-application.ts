import { LitElement, html, customElement, css, property } from "lit-element";
import { integration } from "..";
import { Status } from "../models/status";

@customElement("main-application")
export class MainApplication extends LitElement {
    @property({ type: Boolean }) public showHeader = true;
    @property({ type: Boolean }) public showNodePanel = true;

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
            ${(this.showNodePanel ? html`<node-panel style="grid-area: node-panel"></node-panel>` : null)}
            ${(this.showHeader ? html`<top-bar style="grid-area: topbar"></top-bar>` : null)}
            <context-menu></context-menu>
            <popup-modal id="popup-modal"></popup-modal>
        `;
        } else {
            return html`${integration.openremote.error}`;
        }
    }
}
