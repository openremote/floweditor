import { LitElement, property, customElement, html, css } from "lit-element";
import { ContextMenuEntry, ContextMenuButton, ContextMenuSeparator } from "..";

@customElement("context-menu")
export class ContextMenu extends LitElement {
    private entries: ContextMenuEntry[] = [];

    @property({ attribute: false }) private isOpen = false;

    private static main: ContextMenu;
    public static get opened() { return ContextMenu.main.isOpen; }

    public static get styles() {
        return css`
        :host{
            min-width: 250px;
            display: inline-block;
            position: absolute;
            background: white;
            outline: 1px solid rgb(200,200,200);
            box-shadow: rgba(0, 0, 0, 0.05) 0 2px 4px;
            font-size: 13px;
            z-index: 1000;
        }
        .context-menu-button{
            padding: 5px 10px 5px 10px;
            color: rgb(0,0,0);
        }
        .context-menu-button:hover{
            background: whitesmoke;
        }
        .muted{
            pointer-events: none;
            color: rgb(150,150,150);
        }
        .context-menu-separator{
            --thickness: 1px;
            border: 0;
            height: var(--thickness);
            border-bottom: solid var(--thickness);
            border-color: rgb(234,234,234);
            padding: 0;
            margin: 5px 10px calc(5px - var(--thickness)) 10px;
        }`;
    }

    public static open(x: number, y: number, buttons: (ContextMenuEntry)[]) {
        ContextMenu.main.style.top = y + "px";
        ContextMenu.main.style.left = x + "px";
        window.addEventListener("mousedown", ContextMenu.main.closeCallback);
        window.addEventListener("blur", ContextMenu.main.closeCallback);
        window.addEventListener("wheel", ContextMenu.main.closeCallback);
        ContextMenu.main.entries = buttons;
        ContextMenu.main.isOpen = true;
    }

    public static close() {
        window.removeEventListener("mousedown", ContextMenu.main.closeCallback);
        window.removeEventListener("blur", ContextMenu.main.closeCallback);
        window.removeEventListener("wheel", ContextMenu.main.closeCallback);
        ContextMenu.main.isOpen = false;
    }

    protected firstUpdated() {
        ContextMenu.main = this;
    }

    private closeCallback = () => {
        ContextMenu.close();
    }

    protected render() {
        this.style.display = this.isOpen ? "unset" : "none";
        if (!this.isOpen) {
            return html``;
        }
        const elements = this.entries.map(
            (e) => {
                switch (e.type) {
                    case "button":
                        return this.buttonTemplate(e as ContextMenuButton);
                    case "separator":
                        return this.separatorTemplate();
                }
            }
        );
        return html`${elements.length > 0 ? elements : html`<div class="context-menu-button muted">Empty</div>`}`;
    }

    private buttonTemplate(button: ContextMenuButton) {
        const action = (e: MouseEvent) => {
            if (e.buttons !== 1) { return; }
            ContextMenu.close();
            button.action();
            e.stopImmediatePropagation();
            e.stopPropagation();
        };
        return html`<div class="context-menu-button ${(button.disabled || false) ? `muted` : ``}" @mousedown="${action}">${button.label}</div>`;
    }

    private separatorTemplate() {
        return html`<div class="context-menu-separator"></div>`;
    }
}
