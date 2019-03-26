import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatSelectModule,
  MatSliderModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule } from '@angular/material/';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolpanelComponent } from './components/toolpanel/toolpanel.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { GraphNodeComponent } from './components/graph-node/graph-node.component';
import { GraphNodeMenuItemComponent } from './components/graph-node-menu-item/graph-node-menu-item.component';

import { GraphNodeTypeClassPipe } from './pipes/graph-node-type-class.pipe';
import { GraphSocketTypeColourPipe } from './pipes/graph-socket-type-colour.pipe';

import { HttpClientModule } from '@angular/common/http';
import { PickerComponent } from './components/picker/picker.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolpanelComponent,
    WorkspaceComponent,
    GraphNodeComponent,
    GraphNodeTypeClassPipe,
    GraphSocketTypeColourPipe,
    GraphNodeMenuItemComponent,
    PickerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
