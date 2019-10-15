import { LitElement, html, customElement, css, property } from "lit-element";

@customElement("top-bar")
export class TopBar extends LitElement {
    static get styles() {
        return css`
        :host{
            display: flex;
            width: 100%;
            justify-content: flex-start;
            align-items: center;
            box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -5px;
            line-height: var(--topbar-height);
        }
        
        .button{
            margin: 0 15px 0 15px;
            cursor: pointer;
        }

        .title{
            margin: 0 0 0 15px;
            width: calc(var(--node-panel-width) - 15px);
            text-transform: uppercase;
            font-weight: bold;
        }

        .right{ 
            margin-left: auto;
        }
        `;
    }

    public render() {
        return html`
        <span class="title">Flow Editor</span>
        <a class="button">Save</a>
        <a class="button">Open</a>
        <a class="button">Help</a>
        <a class="button right">Log out</a>
        `;
    }
}
