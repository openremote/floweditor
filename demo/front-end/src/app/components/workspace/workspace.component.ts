import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionService } from 'src/app/services/selection.service';
import { ContextMenuService } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit, AfterViewInit {

  private mousePos: { x: number, y: number } = { x: 0, y: 0 };
  private hasFocus = true;

  constructor(private project: ProjectService, private select: SelectionService, private context: ContextMenuService) {
    window.oncontextmenu = (e) => { this.hasFocus = e.defaultPrevented; };
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  updateMousePos(event: MouseEvent) {
    this.mousePos.x = event.clientX;
    this.mousePos.y = event.clientY;
  }

  mouseDown(e: MouseEvent) {
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
