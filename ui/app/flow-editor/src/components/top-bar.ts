import { LitElement, html, customElement, css, property } from "lit-element";
import { IdentityDomLink } from "node-structure";
import { project } from "..";

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
            padding: 0 25px 0 25px;
            cursor: pointer;
        }

        .button:hover{
            background: #fafafa;
        }

        .button:active{
            background: whitesmoke;
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

    protected render() {
        return html`
        <span class="title">Flow Editor</span>
        <a class="button">Save</a>
        <a class="button">Open</a>
        <a class="button">Help</a>

        <a class="debug button" @click="${() => { console.log(IdentityDomLink.map); console.log(project); }}">print info</a>
        <a class="debug button" @click="${() => { console.log({nodes: project.nodes, connections: project.connections}); }}">print node structure</a>

        <a class="button right">Log out</a>
        `;
    }
}
