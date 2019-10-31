import { LitElement, html, customElement, css, property } from "lit-element";
import { IdentityDomLink } from "node-structure";
import { project, modal, exporter } from "..";
import { OrInputChangedEvent } from "@openremote/or-input";

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

        .debug.button{
            background: yellow;
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
        <a class="button" @click="${this.showSaveAsDialog}">Save${project.isInUnsavedState ? "*" : null}</a>
        ${project.existingFlowRuleId === -1 ? null : html`<a class="button">Save as...</a>`}
        <a class="button">Open</a>
        <a class="button">Help</a>

        <a class="debug button" @click="${() => { console.log(IdentityDomLink.map); console.log(project); }}">print info</a>
        <a class="debug button" @click="${() => { console.log({ nodes: project.nodes, connections: project.connections }); }}">print node structure</a>

        <a class="button right">Log out</a>
        `;
    }

    private showSaveAsDialog() {
        let chosenName = "";
        let chosenDesc = "";
        modal.element.content = html`
            <div style="display: flex; flex-direction: column; width: auto; justify-content: space-between; align-items: stretch;">
            <or-input style="margin-bottom: 16px;" fullWidth required type="text" placeholder="Name" label="Name"
            @or-input-changed="${(e: OrInputChangedEvent) => { chosenName = e.detail.value; }}"
            ></or-input>
            <or-input style="margin-bottom: 16px;" fullWidth type="text" placeholder="Description" label="Description"
            @or-input-changed="${(e: OrInputChangedEvent) => { chosenDesc = e.detail.value; }}"
            ></or-input>
            <or-input style="text-align: right" type="button" label="Save as global ruleset" @click="${() => {
                exporter.exportAsNew(project.toNodeCollection(chosenName, chosenDesc));
                modal.element.close();
            }}"></or-input>
            </div>
        `;
        modal.element.header = "Save project";
        modal.element.open();
    }
}
