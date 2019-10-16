import { Integration } from "./services/integration";

export { NodePanel } from "./components/node-panel";
export { EditorWorkspace } from "./components/editor-workspace";
export { TopBar } from "./components/top-bar";
export { NodeMenuItem } from "./components/node-menu-item";
export { FlowNode } from "./components/flow-node";
export { MainApplication as Application } from "./components/main-application";

export { Project } from "./services/project";
export { Integration } from "./services/integration";

export { OrIcon } from "@openremote/or-icon";
export * from "@webcomponents/webcomponentsjs";

export const integration: Integration = new Integration();

window.addEventListener("load", () => {
    integration.initialise();
});
