import { LitElement, html, customElement, css, property } from "lit-element";
import { IdentityDomLink } from "node-structure";
import { project, modal, exporter } from "..";
import { OrInputChangedEvent } from "@openremote/or-input";
import manager from "@openremote/core";
import { GlobalRuleset } from "@openremote/model";

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
        <a class="button" @click="${this.save}">Save</a>
        ${project.existingFlowRuleId === -1 ? null : html`<a @click="${this.showSaveAsDialog}" class="button">Save as...</a>`}
        <a class="button" @click="${this.showRuleBrowser}">Open</a>
        <a class="button">Help</a>

        <a class="debug button" @click="${() => { console.log(IdentityDomLink.map); console.log(project); }}">print info</a>
        <a class="debug button" @click="${() => { console.log({ nodes: project.nodes, connections: project.connections }); }}">print node structure</a>

        <a class="button right">Log out</a>
        `;
    }

    private save() {
        if (project.existingFlowRuleId === -1) {
            this.showSaveAsDialog();
        } else {
            exporter.exportAsExisting(
                project.existingFlowRuleId,
                project.toNodeCollection(project.existingFlowRuleName, project.existingFlowRuleDesc));
        }
    }

    private async showRuleBrowser() {
        const response = await manager.rest.api.RulesResource.getGlobalRulesets();
        console.log(response.data);
        modal.element.content = html`${response.data.map((r: GlobalRuleset) => html`<button @click="${async () => {
            const ruleset = (await manager.rest.api.RulesResource.getGlobalRuleset(r.id)).data;
            const collection = exporter.jsonToFlow(ruleset.rules);
            project.fromNodeCollection(collection);
            project.setCurrentProject(r.id, r.name, collection.description);
        }}">${r.name}</button>`)}`;
        modal.element.header = "Select a Flow rule";
        modal.element.open();
    }

    private showSaveAsDialog() {
        let chosenName = "";
        let chosenDesc = "";
        modal.element.content = html`
            <div style="display: flex; flex-direction: column; width: auto; justify-content: space-between; align-items: stretch;">
            <or-input style="margin-bottom: 16px; width:100%;" required type="text" itle="Name" placeholder="Name" label="Name"
            @or-input-changed="${(e: OrInputChangedEvent) => { chosenName = e.detail.value; }}"
            ></or-input>
            <or-input style="margin-bottom: 16px; width:100%;" fullwidth type="textarea" title="Description" placeholder="Description" label="Description"
            @or-input-changed="${(e: OrInputChangedEvent) => { chosenDesc = e.detail.value; }}"
            ></or-input>
            <div>
                <or-input style="text-align: left; margin-right: 10px" type="button" label="Cancel" @click="${modal.element.close}"></or-input>
                <or-input style="text-align: right" type="button" unelevated label="Save as global ruleset" @click="${() => {
                if (!chosenName) { return; }
                exporter.exportAsNew(project.toNodeCollection(chosenName, chosenDesc));
                modal.element.close();
            }}"></or-input>
            </div>
            </div>
        `;
        modal.element.header = "Save project";
        modal.element.open();
    }
}
