import { Node, NodeConnection } from "@openremote/model";

export class CopyPasteManager {
    private clipboard: {
        nodes: Node[],
        connections: NodeConnection[]
    };

    public get isFull() { return !!this.clipboard; }

    public putInClipboard(obj: {
        nodes: Node[],
        connections: NodeConnection[]
    }) {
        this.clipboard = obj;
    }

    // TODO zorgen dat die IDs en alles anders zijn, maar nog steeds hetzelfde referenced snap je? mooi zo. hup aan de slag.
}
