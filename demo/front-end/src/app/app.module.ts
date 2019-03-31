import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularDraggableModule } from 'angular2-draggable';
import {
  MatSelectModule,
  MatSliderModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatExpansionModule,
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
    GraphNodeNamePipe
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
    MatSnackBarModule,
    MatDialogModule,
    AngularDraggableModule,
    MatExpansionModule
  ],
  entryComponents: [ResultDisplayDialogComponent],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
