import { LitElement, html, customElement, css, property } from "lit-element";

@customElement("confirmation-dialog")
export class ConfirmationDialog extends LitElement {
    @property({ type: String }) public agreeText = "Yes";
    @property({ type: String }) public disagreeText = "Cancel";
    @property({ type: String }) public question = "Are you sure?";

    public static get styles() {
        return css`
        .question{
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
        <div class="question">${this.question}</div>
        <div class="container">
            <or-input type="button" unElevated label="${this.agreeText}"
                @click="${() => { this.dispatchEvent(new CustomEvent("agreed")); }}">
            </or-input>

            <or-input type="button" label="${this.disagreeText}"
                @click="${() => { this.dispatchEvent(new CustomEvent("disagreed")); }}">
            </or-input>
        </div>
        `;
    }
}
