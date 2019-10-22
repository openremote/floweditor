import { LitElement, property } from "lit-element";
import { input } from "..";

export class SelectableElement extends LitElement {
    @property({ attribute: false }) private isSelected = false;
    private handle: Element;

    constructor() {
        super();
        this.setHandle(this);
    }

    public get selected() {
        return this.isSelected;
    }

    public setHandle(element: HTMLElement) {
        if (this.handle !== null) {
            input.removeListener("selected", this.onSelected);
            input.removeListener("deselected", this.onDeselected);
            element.removeEventListener("mousedown", this.handleSelection);
        }
        
        this.handle = element;
        input.addListener("selected", this.onSelected);
        input.addListener("deselected", this.onDeselected);
        element.addEventListener("mousedown", this.handleSelection);
    }

    private readonly onSelected = (e: Element) => {
        if (e === this.handle) {
            this.isSelected = true;
        }
    }

    private readonly onDeselected = (e: Element) => {
        if (e === this.handle) {
            this.isSelected = false;
        }
    }

    private readonly handleSelection = (event: MouseEvent) => {
        if (event.buttons === 1) {
            input.handleSelection(this);
            event.stopPropagation();
        }
    }
}
