import { LitElement, customElement, property, html, css } from "lit-element";
import { project } from "..";
import { NodeSocket } from "@openremote/model";
import { IdentityDomLink } from "node-structure";
import { Utilities } from "../utils";

@customElement("flow-node-socket")
export class FlowNodeSocket extends LitElement {
    @property({ attribute: false }) public socket: NodeSocket;
    @property({ type: String }) public side: "input" | "output";
    @property({ type: Boolean }) public renderLabel = false;

    private identityDeleted = false;
    private circleElem: HTMLElement;
    private readonly circleId = "circle";

    public get connectionPosition() {
        return Utilities.getCenter(this.circleElem.getBoundingClientRect());
    }

    public static get styles() {
        return css`
        :host{
            width: auto;
            height: var(--socket-size);
            margin: 2px;
            display: inline-block;
        }
        .socket{
            background: none;
            height: var(--socket-size);
            width: var(--socket-size);
            border-radius: 100%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }
        .socket:hover{
            background: var(--highlight);
        }
        .label{
            display:inline-block;
            vertical-align: top;
            color: rgba(0,0,0,.5);
        }
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

    public get socketTypeString() {
        return this.socket.type.toString().toLowerCase();
    }

    protected firstUpdated() {
        this.title = this.socketTypeString;
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
        this.circleElem = this.shadowRoot.getElementById(this.circleId);
    }

    protected render() {
        const color = `var(--${this.socketTypeString})`;
        const socket = html`<div class="socket"><div class="circle" id=${this.circleId} style="background: ${color}"></div></div>`;
        if (!this.renderLabel) { return socket; }
        const label = html`<div class="label">${this.socket.name}</div>`;
        if (this.side === "input") {
            return html`${socket}${label}`;
        } else {
            return html`${label}${socket}`;
        }
    }

    private linkIdentity() {
        if (!this.identityDeleted) {
            IdentityDomLink.map[this.socket.id] = this;
        }
    }
}
