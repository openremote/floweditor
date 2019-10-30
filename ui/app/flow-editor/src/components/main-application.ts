import { LitElement, html, customElement, css, property } from "lit-element";
import { integration } from "..";
import { Status } from "../models/status";

@customElement("main-application")
export class MainApplication extends LitElement {
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
            /* for some reason, this gets completely ignored in Firefox */
        }
        `;
    }

    protected firstUpdated() {
        integration.addListener("initialise", () => {
            this.requestUpdate();
        });
    }

    protected render() {
        if (integration.status === Status.Idle || integration.status === Status.Loading) { return; }

        if (integration.status === Status.Success) {
            return html`
            <editor-workspace style="grid-area: workspace"></editor-workspace>
            <node-panel style="grid-area: node-panel"></node-panel>
            <top-bar style="grid-area: topbar"></top-bar>
            <context-menu></context-menu>
            <popup-modal id="popup-modal"></popup-modal>
        `;
        } else {
            return html`${integration.openremote.error}`;
        }
    }
}
