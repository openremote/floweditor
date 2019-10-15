import { LitElement, html, customElement, css } from "lit-element";

@customElement("editor-workspace")
export class EditorWorkspace extends LitElement {
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
        return html`
        <flow-node panX="0" panY="0"></flow-node>
        `;
    }
}
