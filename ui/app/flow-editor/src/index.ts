import { Integration } from "./services/integration";
import { Project } from "./services/project";
import { Input } from "./services/input";
import { ModalService } from "./services/modal";
import { Exporter } from "./services/exporter";
import { Shortcuts } from "./services/shortcuts";
import { CopyPasteManager } from "./services/copy-paste-manager";

import "@openremote/or-select";
import "@openremote/or-asset-tree";
import "@openremote/or-icon";
import "@openremote/or-translate";

export { MainApplication as FlowEditor } from "./components/main-application";
export { Camera } from "./models/camera";
export { LightNodeCollection } from "./models/light-node-collection";

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
