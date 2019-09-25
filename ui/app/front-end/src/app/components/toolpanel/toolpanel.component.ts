import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { NodeManagerService } from 'src/app/services/node-manager.service';
import { NodeType, Node } from '@openremote/model';

@Component({
  selector: 'app-toolpanel',
  templateUrl: './toolpanel.component.html',
  styleUrls: ['./toolpanel.component.css']
})
export class ToolpanelComponent implements OnInit {
  public nodes: Node[] = [];
  public loadingStatus = 0;
  public error: string;

  constructor(
    public restService: RestService,
    public snackBar: MatSnackBar,
    public project: ProjectService,
    private nodeService: NodeManagerService) {
  }

  public loadNodes() {
    this.loadingStatus = 0;

    this.nodes = this.nodeService.translator.getAllNodes();
    console.log(this.nodes);
    this.loadingStatus = 1;
  }

  ngOnInit() {
    this.loadNodes();
  }

  public getNodesFor(type: NodeType) {
    return this.nodes.filter((n) => n.type === type);
  }

  public getAllTypes() {
    return [
      NodeType.INPUT,
      NodeType.PROCESSOR,
      NodeType.OUTPUT,
      // GraphNodeType.Then,
    ];
  }
}
