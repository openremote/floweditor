import { PopupModal } from "../components/popup-modal";
import { html } from "lit-element";

export class ModalService {
    public element: PopupModal;

    public confirmation(agreeCallback: () => void, header: string = "Confirm action", question: string = "Are you sure?") {
        this.element.content = html`<confirmation-dialog 
        .question = "${question}"
        @agreed="${() => { agreeCallback(); this.element.close(); }}"
        @disagreed="${() => { this.element.close(); }}"
        ></confirmation-dialog>`;
        this.element.header = header;
        this.element.open();
    }
}
