import { FlowNode } from "../components/flow-node";
import { ConnectionLine } from "../components/connection-line";
import { input, project } from "../components/main-application";

export class Shortcuts {
    public actions: { keys: string[], requireCtrl?: boolean, action: () => void }[] = [
        {
            keys: ["Delete", "Backspace"],
            action: () => {
                const selectedNodes = input.selected.filter((s) => s instanceof FlowNode && s.selected) as FlowNode[];
                const selectedConnections = input.selected.filter((s) => s instanceof ConnectionLine && s.selected) as ConnectionLine[];
                selectedConnections.forEach((n) => project.removeConnection(n.connection));
                selectedNodes.forEach((n) => project.removeNode(n.node));
            }
        },
        {
            keys: ["KeyA"],
            requireCtrl: true,
            action: () => {
                if (input.selected.length > 0) {
                    input.clearSelection(true);
                } else {
                    input.selectables.forEach((s) => {
                        input.select(s, true);
                    });
                }
            }
        }
    ];

    constructor() {
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (!(document.activeElement instanceof HTMLBodyElement)) { return; }
            this.actions.forEach((a) => {
                if (!a.keys.includes(e.key) && !a.keys.includes(e.code)) { return; }
                if (a.requireCtrl && !e.ctrlKey) { return; }
                a.action();
            });
        });
    }
}
