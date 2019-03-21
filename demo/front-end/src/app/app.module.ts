import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolpanelComponent } from './components/toolpanel/toolpanel.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { GraphNodeComponent } from './components/graph-node/graph-node.component';
import { GraphNodeTypeClassPipe } from './pipes/graph-node-type-class.pipe';
import { GraphSocketTypeColourPipe } from './pipes/graph-socket-type-colour.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToolpanelComponent,
    WorkspaceComponent,
    GraphNodeComponent,
    GraphNodeTypeClassPipe,
    GraphSocketTypeColourPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
