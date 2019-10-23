import { LitElement, property, customElement, html, css } from "lit-element";
import { input } from "..";

@customElement("context-menu")
export class ContextMenu extends LitElement {
    @property({ attribute: false }) public buttons: { label: string, action: () => void }[];

    public static get styles() {
        return css``;
    }

    protected render() {
        return html``;
    }

    private buttonTemplate(button: { label: string, action: () => void }) {
        // TODO create button template and simple, temporary, presentable styling
    }
}
