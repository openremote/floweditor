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
  private openremote = openremote;
  private Status = IntegrationServiceStatus;

  public requestedRealm = 'master';

  private status = IntegrationServiceStatus.Busy;
  private initCallbacks: (() => void)[] = [];

  public assets: Asset[] = [];
  public descriptors: AssetDescriptor[] = [];
  public realms: Tenant[] = [];

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

  public refreshAssets(successCallback?: (assets: Asset[]) => void, errorCallback?: (error: any) => void) {
    const query: AssetQuery = {
      select: {
        excludeAttributes: false,
        excludeParentInfo: false,
        excludeAttributeMeta: false,
      }
    };

    rest.api.AssetResource.queryAssets(query)
      .then((response) => {
        this.assets = response.data;
        console.log(this.assets);
        if (successCallback) {
          successCallback(this.assets);
        }
      }).catch((error) => {
        if (errorCallback) {
          errorCallback(error);
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

  public refreshAssetDescriptors(successCallback?: (assets: AssetDescriptor[]) => void) {
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

  public addRule(name: string, data: string, callback?: (status: any) => void) {
    rest.api.RulesResource.createGlobalRuleset({
      lang: RulesetLang.FLOW,
      name,
      type: 'global',
      rules: data
    }).then((e) => {
      console.log(e);
      if (callback) {
        callback(e);
      }
    }).catch(console.error);
  }

  public getInitialisationCallback(callback: () => void) {
    if (this.status === IntegrationServiceStatus.Authenticated) {
      callback();
    } else {
      this.initCallbacks.push(callback);
    }
  }

  public getFlowResource() {
    return rest.api.FlowResource;
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
