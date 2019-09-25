import { Injectable } from '@angular/core';
import rest from '@openremote/rest';
import { IntegrationService } from './integration.service';
import {
  AxiosFlowResourceClient,
  AxiosRulesResourceClient,
  AxiosAssetResourceClient,
  AxiosAssetModelResourceClient,
  AxiosTenantResourceClient
} from '@openremote/rest/src/restclient';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private intergration: IntegrationService) { }

  private getPromise<T>(obj: T) {
    return new Promise<T>((resolve, reject) => {
      this.intergration.getInitialisationCallback(() => {
        resolve(obj);
      });
    });
  }

  public getFlowResource(): Promise<AxiosFlowResourceClient> {
    return this.getPromise(rest.api.FlowResource);
  }

  public getRuleResource(): Promise<AxiosRulesResourceClient> {
    return this.getPromise(rest.api.RulesResource);
  }

  public getAssetResource(): Promise<AxiosAssetResourceClient> {
    return this.getPromise(rest.api.AssetResource);
  }

  public getAssetModelResource(): Promise<AxiosAssetModelResourceClient> {
    return this.getPromise(rest.api.AssetModelResource);
  }

  public getTenantResource(): Promise<AxiosTenantResourceClient> {
    return this.getPromise(rest.api.TenantResource);
  }
}
