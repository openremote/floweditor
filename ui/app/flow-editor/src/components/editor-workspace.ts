import { LitElement, html, customElement, css } from "lit-element";

@customElement("editor-workspace")
export class EditorWorkspace extends LitElement {
    static get styles() {
        return css`
        :host{
            background-color: whitesmoke;
        }
        `;
    }

    public render() {
        return html`
        `;
    }
}
