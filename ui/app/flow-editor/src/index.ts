import { Integration } from "./services/integration";
import { Project } from "./services/project";
import { Input } from "./services/input";

export { NodePanel } from "./components/node-panel";
export { EditorWorkspace } from "./components/editor-workspace";
export { TopBar } from "./components/top-bar";
export { NodeMenuItem } from "./components/node-menu-item";
export { SelectableElement } from "./components/selectable-element";
export { FlowNode } from "./components/flow-node";
export { ConnectionLine } from "./components/connection-line";
export { ConnectionContainer } from "./components/connection-container";
export { MainApplication as Application } from "./components/main-application";

export { Camera } from "./models/camera";
export { Status } from "./models/status";

export { Integration } from "./services/integration";
export { Project } from "./services/project";
export { Input } from "./services/input";

export { Utilities } from "./utils";

export { OrIcon } from "@openremote/or-icon";
export * from "@webcomponents/webcomponentsjs";

export const integration: Integration = new Integration();
export const project: Project = new Project();
export const input: Input = new Input();

window.addEventListener("load", () => {
    integration.initialise();
});
