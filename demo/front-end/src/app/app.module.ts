import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularDraggableModule } from 'angular2-draggable';
import {
  MatSelectModule,
  MatSliderModule,
  MatInputModule,
  MatListModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatExpansionModule,
  MatRippleModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material/';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolpanelComponent } from './components/toolpanel/toolpanel.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { GraphNodeComponent } from './components/graph-node/graph-node.component';
import { GraphNodeMenuItemComponent } from './components/graph-node-menu-item/graph-node-menu-item.component';

import { GraphNodeTypeClassPipe } from './pipes/graph-node-type-class.pipe';
import { GraphSocketTypeColourPipe } from './pipes/graph-socket-type-colour.pipe';
import { GraphNodeNamePipe } from './pipes/graph-node-name.pipe';

import { HttpClientModule } from '@angular/common/http';
import { PickerComponent } from './components/picker/picker.component';
import { ConnectionComponent } from './components/connection/connection.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ResultDisplayDialogComponent } from './components/result-display-dialog/result-display-dialog.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';
import { ExportSettingsDialogComponent } from './components/export-settings-dialog/export-settings-dialog.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolpanelComponent,
    WorkspaceComponent,
    GraphNodeComponent,
    GraphNodeTypeClassPipe,
    GraphSocketTypeColourPipe,
    GraphNodeMenuItemComponent,
    PickerComponent,
    ConnectionComponent,
    ToolbarComponent,
    ResultDisplayDialogComponent,
    GraphNodeNamePipe,
    SettingsPanelComponent,
    ExportSettingsDialogComponent,
    ErrorDialogComponent,
    HelpDialogComponent,
    ContextMenuComponent,
    EditorComponent
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
    MatListModule,
    MatRippleModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    AngularDraggableModule
  ],
  entryComponents: [
    ResultDisplayDialogComponent,
    SettingsPanelComponent,
    ExportSettingsDialogComponent,
    ErrorDialogComponent,
    HelpDialogComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
