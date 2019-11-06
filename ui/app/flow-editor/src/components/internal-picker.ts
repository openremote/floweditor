import { LitElement, property, customElement, html, css, TemplateResult } from "lit-element";
import { Node, PickerType, AssetAttributeInternalValue, AssetState, MetaItemType, Asset } from "@openremote/model";
import { nodeConverter } from "../converters/node-converter";
import { OrInputChangedEvent } from "@openremote/or-input";
import { PopupModal } from "./popup-modal";
import { modal } from "..";
import manager from "@openremote/core";
import { OrAssetTreeRequestSelectEvent } from "@openremote/or-asset-tree";

@customElement("internal-picker")
export class InternalPicker extends LitElement {
    @property({ converter: nodeConverter, reflect: true }) public node: Node;
    @property({ type: Number, reflect: true }) public internalIndex: number;

    @property({ type: Array }) private attributeNames: { name: string, label: string }[] = [];
    @property({ type: Object }) private selectedAsset: Asset;
    @property({ type: Boolean }) private assetIntialised = false;

    constructor() {
        super();
    }

    public get internal() {
        return this.node.internals[this.internalIndex];
    }

    public static get styles() {
        return css`
            :host{
                padding: 0;
                margin: 0;
                display: flex;
                flex-direction: column;
            }

            input{
                border: 0;
            }

            textarea, input[type=text], input[type=number], select
            {
                font-family: inherit;
                padding: 10px;
                border-radius: var(--roundness);    
                width: auto;
                border: none;
            }

            textarea{
                min-width: 150px;
                min-height: 37px;
            }
        `;
    }

    protected firstUpdated() {
        this.addEventListener("contextmenu", (e) => e.stopPropagation());
    }

    protected render() {
        switch (this.internal.picker.type) {
            case PickerType.ASSET_ATTRIBUTE:
                if (this.internal.value && !this.assetIntialised) {
                    this.readAssetOnCreation();
                }
                return this.assetAttributeInput;
            case PickerType.COLOR:
                return this.colorInput;
            case PickerType.DOUBLE_DROPDOWN:
                return this.doubleDropdownInput;
            case PickerType.CHECKBOX:
                return this.checkBoxInput;
            case PickerType.DROPDOWN:
                return this.dropdownInput;
            case PickerType.MULTILINE:
                return this.multilineInput;
            case PickerType.NUMBER:
                return this.numberInput;
            case PickerType.TEXT:
                return this.textInput;
        }
        return html`unimplemented<br/>picker`;
    }

    private async readAssetOnCreation() {
        this.populateAttributeNames();
    }

    private get assetTreeTemplate() {
        return html`<or-asset-tree realm="${manager.getRealm()}" @or-asset-tree-request-select="${(e: OrAssetTreeRequestSelectEvent) => {
            console.log(e.detail.detail.node.asset.id);
            const value: AssetAttributeInternalValue = {
                assetId: e.detail.detail.node.asset.id,
                attributeName: "nothing yet"
            };
            this.setValue(value);
            this.populateAttributeNames();
            modal.element.close();
        }}"
        style="width: auto; height: 80vh;"
        ></or-asset-tree>`;
    }

    private async populateAttributeNames() {
        const response = await manager.rest.api.AssetResource.queryAssets({
            ids: [this.internal.value.assetId],
            select: {
                excludeAttributes: false, excludeAttributeMeta: false
            }
        });

        if (response.data.length === 0) {
            this.assetIntialised = true;
            console.warn(`Asset with id ${this.internal.value.assetId} is missing`);
            return;
        }
        this.selectedAsset = response.data[0];
        if (this.selectedAsset.attributes != null) {
            this.attributeNames = [];
            for (const att of Object.keys(this.selectedAsset.attributes)) {
                const meta = (this.selectedAsset.attributes[att] as AssetState).meta;
                if (!meta) { continue; }
                if (meta.find((m) => m.name === MetaItemType.RULE_STATE.urn && m.value === true)) {
                    this.attributeNames.push({
                        name: att,
                        label: meta.find((b) => b.name === MetaItemType.LABEL.urn && b.value).value || att
                    });
                }
            }
            if (this.attributeNames.length !== 0) {
                if (this.internal.value) {
                    if (this.internal.value.attributeName) {
                        this.assetIntialised = true;
                        await this.updateComplete;
                        (this.shadowRoot.getElementById("attribute-select") as HTMLSelectElement).value = this.internal.value.attributeName;
                        return;
                    }
                }
                this.internal.value.attributeName = this.attributeNames[0].name;
            }
        } else {
            this.attributeNames = [];
        }
        this.assetIntialised = true;
    }

    private get assetAttributeInput(): TemplateResult {
        const hasAssetSelected = this.selectedAsset;
        return html`
        <or-input type="button" fullwidth label="${hasAssetSelected ? this.selectedAsset.name : "Select asset"}" 
        icon="format-list-bulleted-square" 
        @click="${() => {
                modal.element.content = this.assetTreeTemplate;
                modal.element.header = "Pick an asset";
                modal.element.open();
            }}"></or-input>
            ${
            hasAssetSelected ? (
                this.attributeNames.length === 0 ?
                    html`<span>No rule state attributes</span>` :
                    html`        
                <select id="attribute-select" style="margin-top: 10px" @input="${(e: any) => {
                            const value: AssetAttributeInternalValue = {
                                assetId: this.selectedAsset.id,
                                attributeName: e.target.value
                            };
                            return this.setValue(value);
                        }}">
                    ${this.attributeNames.map((a) => html`<option value="${a.name}" title="${a.name}">${a.label}</option>`)}
                </select>`) :
                null
            }
        `;
    }

    private get colorInput(): TemplateResult {
        return html`<or-input type="color"></or-input>`; // looks strange
    }

    private get doubleDropdownInput(): TemplateResult {
        return html`unimplemented`;
    }

    private get dropdownInput(): TemplateResult {
        return html`<select @input="${(e: any) => this.setValue(e.target.value)}">
            ${this.internal.picker.options.map((o) => html`<option value="${o.value}" >${o.name}</option>`)}
        </select>`;
    }

    private get checkBoxInput(): TemplateResult {
        return html`<input type="checkbox" ?checked="${this.internal.value || false}" @input="${(e: any) => this.setValue(e.target.checked)}"/>`;
        return html`<or-input type="checkbox" 
        @or-input-changed="${(e: OrInputChangedEvent) => {
                this.setValue(e.detail.value);
            }}"></or-input>`;
    }

    private get multilineInput(): TemplateResult {
        return html`<textarea @wheel="${(e: any) => {
            if (e.target.clientHeight < e.target.scrollHeight) {
                return e.stopPropagation();
            }
        }}" @input="${(e: any) => this.setValue(e.target.value)}" placeholder="${this.internal.name}"></textarea>`;
    }

    private get numberInput(): TemplateResult {
        return html`<input @wheel="${(e: any) => {
            if (e.target === this.shadowRoot.activeElement) {
                return e.stopPropagation();
            }
        }}" @input="${(e: any) => this.setValue(parseFloat(e.target.value))}" value="${this.internal.value || 0}" type="number" placeholder="${this.internal.name}"/>`;
    }

    private get textInput(): TemplateResult {
        return html`<input @input="${(e: any) => this.setValue(e.target.value)}" value="${this.internal.value || ""}" type="text" placeholder="${this.internal.name}"/>`;
    }

    private setValue(value: any) {
        this.node.internals[this.internalIndex].value = value;
        this.onPicked();
    }

    private async onPicked() {
        await this.updateComplete;
        this.dispatchEvent(new CustomEvent("picked"));
    }
}
