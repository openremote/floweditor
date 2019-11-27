import openremote, { Auth } from "@openremote/core";
import rest from "@openremote/rest";
import { Node } from "@openremote/model";
import { EventEmitter } from "events";
import { Status } from "../models/status";
import { integration } from "../components/flow-editor";

export class Integration extends EventEmitter {
    public openremote = openremote;
    public rest = rest;
    public nodes: Node[] = [];

    public get isAuthenticated() {
        return openremote.authenticated;
    }

    public get status() {
        return this.integrationStatus;
    }

    private integrationStatus: Status = Status.Idle;

    public async refreshNodes() {
        this.nodes = [];
        const allNodes = (await integration.rest.api.FlowResource.getAllNodeDefinitions()).data;
        for (const n of allNodes) {
            this.nodes.push(n);
        }
    }

    public async initialise() {
        this.integrationStatus = Status.Loading;
        openremote.init({
            managerUrl: "http://localhost:8080",
            keycloakUrl: "http://localhost:8080/auth",
            auth: Auth.KEYCLOAK,
            autoLogin: true,
            realm: "master",
        }).then(async (result) => {
            this.integrationStatus = result ? Status.Success : Status.Failure;
            openremote.language = "en";
            await this.refreshNodes();
            this.emit("initialise", result);
        }).catch((e) => {
            this.integrationStatus = Status.Failure;
        });
    }
}
