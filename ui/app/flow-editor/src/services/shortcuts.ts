import { project, input, FlowNode, ConnectionLine } from "..";

export class Shortcuts {
    public actions: { keys: string[], action: () => void }[] = [
        {
            keys: ["Delete", "Backspace"],
            action: () => {
                const selectedNodes = input.selected.filter((s) => s instanceof FlowNode) as FlowNode[];
                const selectedConnections = input.selected.filter((s) => s instanceof ConnectionLine) as ConnectionLine[];
                selectedConnections.forEach((n) => project.removeConnection(n.connection));
                selectedNodes.forEach((n) => project.removeNode(n.node));
            }
        },
    ];

    constructor() {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (!(document.activeElement instanceof HTMLBodyElement)) { return; }
            this.actions.forEach((a) => {
                if (!a.keys.includes(e.key)) { return; }
                a.action();
            });
        });
    }
}
