import { LitElement, property, customElement, html, css, TemplateResult } from "lit-element";
import { Node, PickerType, AssetAttributeInternalValue } from "@openremote/model";
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
    @property({ type: Object, reflect: true }) public value: any;

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
        this.addEventListener("wheel", (e) => e.stopPropagation());
    }

    protected render() {
        switch (this.internal.picker.type) {
            case PickerType.ASSET_ATTRIBUTE:
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

    private get assetTreeTemplate(){
        return html`<or-asset-tree realm="${manager.getRealm()}" @or-asset-tree-request-select="${(e: OrAssetTreeRequestSelectEvent) => {
            console.log(e.detail.detail.node.asset.id);
            const value: AssetAttributeInternalValue ={
                assetId: e.detail.detail.node.asset.id,
                attributeName: "nothing yet"
            }
            this.setValue(value);
            modal.element.close();
        }}"
        style="width: auto; height: 80vh;"
        ></or-asset-tree>`;
    }

    private get assetAttributeInput(): TemplateResult {
        const hasAssetSelected = this.internal.value ? this.internal.value.assetId : false;
        return html`
        <or-input type="button" label="${hasAssetSelected ? this.internal.value.assetId : "Select asset"}" icon="format-list-bulleted-square" @click = "${(e) => {
            modal.element.content = this.assetTreeTemplate;
            modal.element.header = "Pick an asset";
            modal.element.open();
        }}"></or-input>
        <select style="margin-top: 10px">
            <option>an attribute</option>
            <option>another attribute</option>
        </select>
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
        // return html`<input type="checkbox" @input="${(e: any) => this.setValue(e.target.value)}"/>`;
        return html`<or-input type="checkbox" 
        @or-input-changed="${(e: OrInputChangedEvent) => {
                this.setValue(e.detail.value);
            }}"></or-input>`;
    }

    private get multilineInput(): TemplateResult {
        return html`<textarea @input="${(e: any) => this.setValue(e.target.value)}" placeholder="${this.internal.name}"></textarea>`;
    }

    private get numberInput(): TemplateResult {
        return html`<input @input="${(e: any) => this.setValue(e.target.value)}" type="number" placeholder="${this.internal.name}"/>`;
    }

    private get textInput(): TemplateResult {
        return html`<input @input="${(e: any) => this.setValue(e.target.value)}" type="text" placeholder="${this.internal.name}"/>`;
    }

    private setValue(value: any) {
        this.value = value;
        this.node.internals[this.internalIndex].value = value;
    }
}
