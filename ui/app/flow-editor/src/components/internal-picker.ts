import { LitElement, property, customElement, html, css, TemplateResult } from "lit-element";
import { Node, PickerType } from "@openremote/model";
import { nodeConverter } from "../converters/node-converter";

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
            }

            input{
                border: 0;
            }

            textarea, input[type=text]
            {
                font-family: inherit;
                padding: 10px;
                border-radius: var(--roundness);    
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
        console.log(this.internal.value);
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
        return html`<or-asset-tree></or-asset-tree>`;
    }

    private get colorInput(): TemplateResult {
        return html`unimplemented`;
    }

    private get doubleDropdownInput(): TemplateResult {
        return html`unimplemented`;
    }

    private get dropdownInput(): TemplateResult {
        return html`<select @input="${(e: any) => this.setValue(e.target.value)}">
            ${this.internal.picker.options.map((o) => html`<option value="${o.value}" >${o.name}</option>`)}
        </select>`;
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
