import openremote, { Auth } from "@openremote/core";
import rest from "@openremote/rest";
import { EventEmitter } from "events";
import { Status } from "../models/status";

export class Integration extends EventEmitter {
    public openremote = openremote;
    public rest = rest;

    public get isAuthenticated() {
        return openremote.authenticated;
    }

    public get status() {
        return this.integrationStatus;
    }

    private integrationStatus: Status = Status.Idle;

    public initialise() {
        this.integrationStatus = Status.Loading;
        openremote.init({
            managerUrl: "http://localhost:8080",
            keycloakUrl: "http://localhost:8080/auth",
            auth: Auth.KEYCLOAK,
            autoLogin: true,
            realm: "master",
        }).then((result) => {
            this.integrationStatus = result ? Status.Success : Status.Failure;
            openremote.language = "en";
            this.emit("initialise", result);
        }).catch((e) => {
            this.integrationStatus = Status.Failure;
        });
    }
}
