import { EventEmitter } from "events";
import { asEnumerable } from "ts-linq";
import { SelectableElement } from "../components/selectable-element";

export class Input extends EventEmitter {
    public selected: Element[] = [];
    public selectables: SelectableElement[] = [];
    private keysCurrentlyHeld: string[] = [];

    constructor() {
        super();
        window.addEventListener("keydown", this.onkeydown);
        window.addEventListener("keyup", this.onkeyup);
        window.addEventListener("blur", () => {
            this.clearSelection();
            this.keysCurrentlyHeld = [];
        })
    }

    public select(element: Element, forceMultipleSelection = false) {
        if (!this.mutliselectEnabled && !forceMultipleSelection) { this.clearSelection(); }
        if (this.selected.includes(element)) { return; }
        this.selected.push(element);
        this.emit("selected", element);
    }

    public deselect(element: Element) {
        const index = this.selected.indexOf(element);
        if (index === -1) { return; }
        this.selected.splice(index, 1);
        this.emit("deselected", element);
    }

    public handleSelection(element: Element) {
        if (!this.mutliselectEnabled && this.selected.length > 1) {
            this.select(element);
        } else if (this.selected.includes(element)) {
            this.deselect(element);
        } else {
            this.select(element);
        }
    }

    public clearSelection() {
        const originallySelected = asEnumerable(this.selected).ToArray();
        for (const element of originallySelected) {
            this.deselect(element);
        }
        this.emit("selectioncleared");
    }

    public isHeld(key: string) {
        return this.keysCurrentlyHeld.includes(key);
    }

    public get mutliselectEnabled() {
        return this.isHeld("Shift") || this.isHeld("Control");
    }

    private onkeydown = (e: KeyboardEvent) => {
        if (this.keysCurrentlyHeld.includes(e.key)) { return; }
        this.keysCurrentlyHeld.push(e.key);
        console.debug(e.key + " down");
    }

    private onkeyup = (e: KeyboardEvent) => {
        const index = this.keysCurrentlyHeld.indexOf(e.key);
        if (index === -1) { return; }
        this.keysCurrentlyHeld.splice(index, 1);
        console.debug(e.key + " up");
    }
}
