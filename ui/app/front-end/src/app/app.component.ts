import { Component, OnInit } from '@angular/core';
import openremote from '@openremote/core';
import { IntegrationService, IntegrationServiceStatus } from './services/integration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public openremote = openremote;
  public IntegrationServiceStatus = IntegrationServiceStatus;

  constructor(public integration: IntegrationService) {
    integration.initialise();
  }

  ngOnInit(): void {

  }
}