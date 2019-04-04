import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphNode } from 'src/app/models/graph.node';
import { RestService } from 'src/app/services/rest.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  private mousePos: { x: number, y: number } = { x: 0, y: 0 };

  constructor(public project: ProjectService) {

  }

  ngOnInit() {
  }

  updateMousePos(event: MouseEvent) {
    this.mousePos.x = event.clientX;
    this.mousePos.y = event.clientY;
  }

}
