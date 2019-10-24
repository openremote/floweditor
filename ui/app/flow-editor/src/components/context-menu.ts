import { LitElement, property, customElement, html, css } from "lit-element";
import { ContextMenuButton } from "..";

@customElement("context-menu")
export class ContextMenu extends LitElement {
    private buttons: ContextMenuButton[] = [];

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
        }`;
    }

    public static open(x: number, y: number, buttons: ContextMenuButton[]) {
        ContextMenu.main.style.top = y + "px";
        ContextMenu.main.style.left = x + "px";
        window.addEventListener("mouseup", ContextMenu.main.closeCallback);
        window.addEventListener("blur", ContextMenu.main.closeCallback);
        window.addEventListener("wheel", ContextMenu.main.closeCallback);
        ContextMenu.main.buttons = buttons;
        ContextMenu.main.isOpen = true;
    }

    public static close() {
        window.removeEventListener("mouseup", ContextMenu.main.closeCallback);
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
        const buttonElements = this.buttons.map(this.buttonTemplate);
        return html`${buttonElements.length > 0 ? buttonElements : html`<div class="context-menu-button muted">Empty</div>`}`;
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
}
