import { Injectable } from '@angular/core';
import openremote, { Auth, Manager } from '@openremote/core';

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
  private openremote = openremote;
  private Status = IntegrationServiceStatus;

  private status = IntegrationServiceStatus.Busy;

  constructor() { }

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

  public initialise() {
    this.status = IntegrationServiceStatus.Busy;
    openremote.init({
      managerUrl: 'http://localhost',
      keycloakUrl: 'http://localhost/auth',
      auth: Auth.KEYCLOAK,
      autoLogin: true,
      realm: 'tenantA'
    }).then(
      (result) => {
        if (result) {
          this.status = openremote.authenticated ? IntegrationServiceStatus.Authenticated : IntegrationServiceStatus.Unauthenticated;
        } else {
          this.status = IntegrationServiceStatus.Failure;
        }
      });
  }
}
