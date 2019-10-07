import { Injectable } from '@angular/core';
import openremote, { Auth } from '@openremote/core';
import rest from '@openremote/rest';
import { Asset, AssetQuery, AssetDescriptor, Tenant, RulesetLang } from '@openremote/model';

export enum IntegrationServiceStatus {
  Busy,
  Failure,
  Authenticated,
  Unauthenticated,
  Skipped
}

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  public openremote = openremote;
  private Status = IntegrationServiceStatus;

  public requestedRealm = 'master';

  private status = IntegrationServiceStatus.Busy;
  private initCallbacks: (() => void)[] = [];

  public getStatus() {
    return this.status;
  }

  public skip() {
    this.status = IntegrationServiceStatus.Skipped;
  }

  public login() {
    openremote.login();
  }

  public logout() {
    openremote.logout();
  }

  public getRealm() {
    return openremote.getRealm();
  }

  public getInitialisationCallback(callback: () => void) {
    if (this.status === IntegrationServiceStatus.Authenticated) {
      callback();
    } else {
      this.initCallbacks.push(callback);
    }
  }

  public initialise() {
    this.requestedRealm = localStorage.realm || 'master';

    this.status = IntegrationServiceStatus.Busy;
    openremote.init({
      managerUrl: 'http://localhost:8080',
      keycloakUrl: 'http://localhost:8080/auth',
      auth: Auth.KEYCLOAK,
      autoLogin: true,
      realm: this.requestedRealm
    }).then(
      (result) => {
        if (result) {
          this.status = openremote.authenticated ? IntegrationServiceStatus.Authenticated : IntegrationServiceStatus.Unauthenticated;
          this.initCallbacks.forEach(callback => {
            callback();
          });
        } else {
          this.status = IntegrationServiceStatus.Failure;
        }
      });
  }
}
