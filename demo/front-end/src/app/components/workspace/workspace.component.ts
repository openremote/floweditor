import { Component, OnInit } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';
import { StandardGraphNodes } from 'src/app/models/StandardGraphNodes';
import { RestService } from 'src/app/services/rest.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  constructor(public project: ProjectService) {
    // this.nodes.push(StandardGraphNodes.CreateAddNode());
    // this.nodes.push(StandardGraphNodes.CreateNumberNode());
    // this.nodes.push(StandardGraphNodes.CreateNumberNode());
  }

  ngOnInit() {
  }

}