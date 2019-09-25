import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { Tenant } from '@openremote/model';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit {
  public chosenRealm = '';
  public realms: Tenant[] = [];

  constructor(public rest: RestService, private integration: IntegrationService) { }

  ngOnInit() {
    this.chosenRealm = localStorage.realm;
    this.loadTenants();
  }

  private async loadTenants() {
    const resource = await this.rest.getTenantResource();
    this.realms = (await resource.getAll()).data;
  }

  public save() {
    if (this.chosenRealm !== localStorage.realm) {
      localStorage.realm = this.chosenRealm;
      this.integration.logout();
    }
  }

}
