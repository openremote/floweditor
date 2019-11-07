import { Integration } from "./services/integration";
import { Project } from "./services/project";
import { Input } from "./services/input";
import { ModalService } from "./services/modal";
import { Exporter } from "./services/exporter";
import { Shortcuts } from "./services/shortcuts";
import { CopyPasteManager } from "./services/copy-paste-manager";

export { MainApplication as Application } from "./components/main-application";
export { NodePanel } from "./components/node-panel";
export { EditorWorkspace } from "./components/editor-workspace";
export { TopBar } from "./components/top-bar";
export { NodeMenuItem } from "./components/node-menu-item";
export { SelectableElement } from "./components/selectable-element";
export { FlowNode } from "./components/flow-node";
export { FlowNodeSocket } from "./components/flow-node-socket";
export { ConnectionLine } from "./components/connection-line";
export { ConnectionContainer } from "./components/connection-container";
export { SelectionBox } from "./components/selection-box";
export { ContextMenu } from "./components/context-menu";
export { InternalPicker } from "./components/internal-picker";
export { PopupModal } from "./components/popup-modal";
export { RuleBrowser } from "./components/rule-browser";

export { Camera } from "./models/camera";
export { Status } from "./models/status";
export { LightNodeCollection } from "./models/light-node-collection";
export { ContextMenuEntry, ContextMenuButton, ContextMenuSeparator } from "./models/context-menu-button";

export { Integration } from "./services/integration";
export { Project } from "./services/project";
export { Input } from "./services/input";
export { ModalService } from "./services/modal";
export { Exporter } from "./services/exporter";
export { CopyPasteManager } from "./services/copy-paste-manager";

export { Utilities } from "./utils";

export { nodeConverter } from "./converters/node-converter";

export { OrIcon } from "@openremote/or-icon";
export { OrAssetTree } from "@openremote/or-asset-tree";
export { OrInput, InputType } from "@openremote/or-input";
export * from "@webcomponents/webcomponentsjs";

export const integration = new Integration();
export const copyPasteManager = new CopyPasteManager();
export const project = new Project();
export const input = new Input();
export const modal = new ModalService();
export const exporter = new Exporter();
export const shortcuts = new Shortcuts();
export const newIds: Set<string> = new Set<string>();

window.addEventListener("load", () => {
    integration.initialise();
});
