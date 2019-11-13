import { LitElement, property } from "lit-element";
import { input } from "..";

export class SelectableElement extends LitElement {
    @property({ type: Boolean }) private isSelected = false;
    @property({ attribute: false }) private selectableHandle: Element;

    protected firstUpdated() {
        this.setHandle(this);
        input.selectables.push(this);
        input.addListener("selected", this.onSelected);
        input.addListener("deselected", this.onDeselected);
    }

    public get selected() {
        return this.isSelected;
    }

    public get handle() {
        return this.selectableHandle;
    }

    public disconnectedCallback() {
        super.disconnectedCallback();
        if (this.selected) {
            input.selected.splice(input.selected.indexOf(this), 1);
        }
        this.isSelected = false;
        input.removeListener("selected", this.onSelected);
        input.removeListener("deselected", this.onDeselected);
        input.selectables.splice(input.selectables.indexOf(this), 1);
    }

    public setHandle(element: Element) {
        if (this.selectableHandle) {
            this.selectableHandle.removeEventListener("mousedown", this.handleSelection);
        }
        element.addEventListener("mousedown", this.handleSelection);
        this.selectableHandle = element;
    }

    private readonly onSelected = (e: Element) => {
        if (e === this) {
            this.isSelected = true;
        }
    }

    private readonly onDeselected = (e: Element) => {
        if (e === this) {
            this.isSelected = false;
        }
    }

    private readonly handleSelection = (event: MouseEvent) => {
        if (event.buttons === 1) {
            input.handleSelection(this);
            event.stopPropagation();
        } else if (event.buttons === 2) {
            input.handleSelection(this, true);
        }
    }
}
