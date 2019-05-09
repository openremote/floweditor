import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  private mousePos: { x: number, y: number } = { x: 0, y: 0 };

  constructor(public project: ProjectService, private select: SelectionService) {

  }

  ngOnInit() {
  }

  updateMousePos(event: MouseEvent) {
    this.mousePos.x = event.clientX;
    this.mousePos.y = event.clientY;
  }

}
