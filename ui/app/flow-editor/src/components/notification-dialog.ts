import { LitElement, html, customElement, css, property } from "lit-element";
import { i18next } from "@openremote/or-translate";

@customElement("notification-dialog")
export class NotificationDialog extends LitElement {
    @property({ type: String }) public buttonText = i18next.t("ok");
    @property({ type: String }) public message = " ";

    public static get styles() {
        return css`
        .message{
            width: 100%;
            padding: 15px 5px 25px 5px;
            text-align: center;
        }
        .container{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            justify-content: space-evenly;
            justify-content: space-around;
        }`;
    }

    protected render() {
        return html`
        <div class="message">${this.message}</div>
        <div class="container">
            <or-input type="button" unElevated label="${this.buttonText}"
                @click="${() => { this.dispatchEvent(new CustomEvent("closed")); }}">
            </or-input>
        </div>
        `;
    }
}
