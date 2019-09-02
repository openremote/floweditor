import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent implements OnInit {
  public chosenRealm = '';

  constructor(public integration: IntegrationService) {
    integration.refreshRealms();
  }

  ngOnInit() {
    this.chosenRealm = localStorage.realm;
  }

  public save() {
    if (this.chosenRealm !== localStorage.realm) {
      localStorage.realm = this.chosenRealm;
      this.integration.logout();
    }
  }

}
