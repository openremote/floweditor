import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolpanelComponent } from './components/toolpanel/toolpanel.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { GraphNodeComponent } from './components/graph-node/graph-node.component';
import { GraphNodeTypeClassPipe } from './pipes/graph-node-type-class.pipe';
import { GraphSocketTypeColourPipe } from './pipes/graph-socket-type-colour.pipe';
import { HttpClientModule } from '@angular/common/http';
import { GraphNodeMenuItemComponent } from './components/graph-node-menu-item/graph-node-menu-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolpanelComponent,
    WorkspaceComponent,
    GraphNodeComponent,
    GraphNodeTypeClassPipe,
    GraphSocketTypeColourPipe,
    GraphNodeMenuItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
