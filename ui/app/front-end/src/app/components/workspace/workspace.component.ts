import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionService } from 'src/app/services/selection.service';
import { ContextMenuService } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent {

  public mousePos: { x: number, y: number } = { x: 0, y: 0 };
  public hasFocus = true;

  constructor(public project: ProjectService, public select: SelectionService, public context: ContextMenuService) {
    window.oncontextmenu = (e) => { this.hasFocus = e.defaultPrevented; };
  }

  public updateMousePos(event: MouseEvent) {
    this.mousePos.x = event.clientX;
    this.mousePos.y = event.clientY;
  }

  public mouseDown(e: MouseEvent) {
    if (e.button !== 0) { return; }
    if (!this.hasFocus) {
      this.hasFocus = true;
      return;
    }
    this.select.startSelection();
    this.select.deselectAll();
    this.context.open = false;
  }
}
