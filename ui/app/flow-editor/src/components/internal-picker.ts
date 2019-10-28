import { LitElement, property, customElement, html, css, TemplateResult } from "lit-element";
import { Node, Picker, PickerType, NodeInternal } from "@openremote/model";
import { InputType } from "@openremote/or-input";

@customElement("internal-picker")
export class InternalPicker extends LitElement {
    @property({ attribute: false }) public node: Node;
    @property({ attribute: false }) public internal: NodeInternal;

    constructor() {
        super();
    }

    public static get styles() {
        return css`
            :host{
                padding: 0;
                margin: 0;
                display: flex;
            }

            textarea{
                font-family: 
                padding: 10px;
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
                return this.assetAttributeInput;
            case PickerType.COLOR:
                return this.colorInput;
            case PickerType.DOUBLE_DROPDOWN:
                return this.doubleDropdownInput;
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

    private get assetAttributeInput(): TemplateResult {
        return html`unimplemented`;
    }

    private get colorInput(): TemplateResult {
        return html`<input type="text"/>`;
    }

    private get doubleDropdownInput(): TemplateResult {
        return html`unimplemented`;
    }

    private get dropdownInput(): TemplateResult {
        return html`<select @input="${(e: any) => this.internal.value = e.target.value}">
            ${this.internal.picker.options.map((o) => html`<option value="${o.value}" >${o.name}</option>`)}
        </select>`;
    }

    private get multilineInput(): TemplateResult {
        return html`<textarea @change="${(e: any) => this.internal.value = e.target.value}"></textarea>`;
    }

    private get numberInput(): TemplateResult {
        return html`<input @change="${(e: any) => this.internal.value = e.target.value}" type="number"/>`;
    }

    private get textInput(): TemplateResult {
        return html`<input @change="${(e: any) => this.internal.value = e.target.value}" type="text"/>`;
    }
}
