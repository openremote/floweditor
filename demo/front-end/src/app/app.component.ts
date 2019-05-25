import { Component, OnInit } from '@angular/core';
import openremote, { Auth, Manager } from '@openremote/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private editorVisible = false;
  private openremote = openremote;

  constructor() {

  }

  ngOnInit(): void {
    openremote.init({
      managerUrl: 'http://localhost',
      keycloakUrl: 'http://localhost/auth',
      auth: Auth.KEYCLOAK,
      autoLogin: true,
      realm: 'master'
    }).then(() => this.editorVisible = true);
  }
}
