import { Component, OnInit } from '@angular/core';
import openremote, { Auth, Manager } from '@openremote/core';
enum Status {
  Busy,
  Failure,
  Authenticated,
  Unauthenticated
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private openremote = openremote;
  private Status = Status;
  private status = Status.Busy;

  constructor() {
    this.initialise();
  }

  private initialise() {
    this.status = Status.Busy;
    openremote.init({
      managerUrl: 'http://localhost',
      keycloakUrl: 'http://localhost/auth',
      auth: Auth.KEYCLOAK,
      autoLogin: true,
      realm: 'tenantA'
    }).then(
      (result) => {
        if (result) {
          this.status = openremote.authenticated ? Status.Authenticated : Status.Unauthenticated;
        } else {
          this.status = Status.Failure;
        }
      });
  }

  private reload() {
    this.initialise();
  }

  ngOnInit(): void {

  }
}
