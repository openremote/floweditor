import openremote, { Auth } from "@openremote/core";
import rest from "@openremote/rest";
import { EventEmitter } from "events";

export class Integration extends EventEmitter {
    public openremote = openremote;
    public rest = rest;

    public get isAuthenticated() {
        return openremote.authenticated;
    }

    public initialise() {
        openremote.init({
            managerUrl: "http://localhost:8080",
            keycloakUrl: "http://localhost:8080/auth",
            auth: Auth.KEYCLOAK,
            autoLogin: true,
            realm: "master"
        }).then(
            (result) => {
                this.emit("initialise");
            });
    }
}
