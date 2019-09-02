import { Component, OnInit } from '@angular/core';
import openremote from '@openremote/core';
import { IntegrationService, IntegrationServiceStatus } from './services/integration.service';
enum Status {
  Busy,
  Failure,
  Authenticated,
  Unauthenticated,
  Skipped
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private openremote = openremote;
  private IntegrationServiceStatus = IntegrationServiceStatus;

  constructor(private integration: IntegrationService) {
    integration.initialise();
  }

  ngOnInit(): void {

  }
}
