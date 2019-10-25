import { LitElement, customElement, property, html, css } from "lit-element";
import { project } from "..";
import { NodeSocket } from "@openremote/model";
import { IdentityDomLink } from "node-structure";

@customElement("flow-node-socket")
export class FlowNodeSocket extends LitElement {
    @property({ attribute: false }) public socket: NodeSocket;
    @property({ type: String }) public side: "input" | "output";

    private identityDeleted = false;

    public static get styles() {
        return css`
        .circle{
            background: grey;
            width: var(--socket-display-size);
            height: var(--socket-display-size);
            border-radius: 100%;
            pointer-events: none;
        }`;
    }

    public disconnectedCallback() {
        this.identityDeleted = delete IdentityDomLink.map[this.socket.id];
    }

    protected firstUpdated() {
        IdentityDomLink.map[this.socket.id] = this;
        project.addListener("connectioncreated", () => {
            this.requestUpdate();
        });
        project.addListener("connectionremoved", () => {
            this.requestUpdate();
        });
        project.addListener("nodeadded", () => {
            this.requestUpdate();
        });
        project.addListener("noderemoved", () => {
            this.requestUpdate();
        });
        project.addListener("cleared", () => {
            this.requestUpdate();
        });

        const isInputSocket = this.side === "input";

        const md = (e: MouseEvent) => {
            this.linkIdentity();
            if (e.buttons !== 1) { return; }
            if (project.isCurrentlyConnecting) { return; }
            project.startConnectionDrag(e, this.socket, isInputSocket);
            e.stopPropagation();
            e.stopImmediatePropagation();
        };

        const mu = (e: MouseEvent) => {
            this.linkIdentity();
            project.endConnectionDrag(e, this.socket, isInputSocket);
            if (e.buttons !== 1) { return; }
            e.stopPropagation();
            e.stopImmediatePropagation();
        };

        this.addEventListener("mousedown", md);
        this.addEventListener("mouseup", mu);
    }

    protected updated() {
        this.linkIdentity();
    }

    protected render() {
        const color = `var(--${this.socket.type.toString().toLowerCase()})`;
        return html`<div title="${this.socket.type}" class="socket"><div class="circle" style="background: ${color}"></div></div>`;
    }

    private linkIdentity() {
        if (!this.identityDeleted) {
            IdentityDomLink.map[this.socket.id] = this;
        }
    }
}
