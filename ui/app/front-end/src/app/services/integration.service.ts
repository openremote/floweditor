import { Injectable } from '@angular/core';
import openremote, { Auth } from '@openremote/core';
import rest from '@openremote/rest';
import { Asset, AssetQuery, AssetQuerySelect, AssetDescriptor, Tenant } from '@openremote/model';
import { isNullOrUndefined } from 'util';

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

  public requestedRealm = 'master';

  private status = IntegrationServiceStatus.Busy;

  public assets: Asset[] = [];
  public descriptors: AssetDescriptor[] = [];
  public realms: Tenant[] = [];

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

  public getRealm() {
    return openremote.getRealm();
  }

  public refreshAssets(successCallback?: (assets: Asset[]) => void) {
    const query: AssetQuery = {
      select: {
        excludeAttributes: false,
      }
    };

    rest.api.AssetResource.queryAssets(query)
      .then((response) => {
        this.assets = response.data;
        console.log(this.assets);
        if (successCallback) {
          successCallback(this.assets);
        }
      });

    // openremote.events.sub()
    // .then((id: string) => this.assetEventSubscription = id);
  }

  public refreshRealms(successCallback?: (assets: Tenant[]) => void) {
    rest.api.TenantResource.getAll().then((reponse) => {
      this.realms = reponse.data;
      if (successCallback) {
        successCallback(this.realms);
      }
    });
  }

  public refreshAssetDescriptors(successCallback?: (assets: Asset[]) => void) {
    rest.api.AssetModelResource.getAssetDescriptors()
      .then((response) => {
        console.log(response.data);
        this.descriptors = response.data;
        if (successCallback) {
          successCallback(this.descriptors);
        }
      });
  }

  public queryAssets(query: AssetQuery, successCallback?: (assets: Asset[]) => void) {
    rest.api.AssetResource.queryAssets(query)
      .then((response) => {
        console.log(response.data);
        if (successCallback) {
          successCallback(response.data);
        }
      });
  }

  public initialise() {

    this.requestedRealm = localStorage.realm || 'master';

    this.status = IntegrationServiceStatus.Busy;
    openremote.init({
      managerUrl: 'https://localhost',
      keycloakUrl: 'https://localhost/auth',
      auth: Auth.KEYCLOAK,
      autoLogin: true,
      realm: this.requestedRealm
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
