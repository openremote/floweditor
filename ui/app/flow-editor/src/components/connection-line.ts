import { LitElement, html, customElement, css, property } from "lit-element";
import { Node, NodeSocket, NodeDataType } from "@openremote/model";
import { EditorWorkspace } from "./editor-workspace";
import { IdentityDomLink } from "node-structure";
import { project } from "..";

@customElement("connection-line")
export class ConnectionLine extends LitElement {
    @property({ attribute: false }) public from: NodeSocket;
    @property({ attribute: false }) public to: NodeSocket;

    public render(){
        return html`<line></line>`;
    }
}
