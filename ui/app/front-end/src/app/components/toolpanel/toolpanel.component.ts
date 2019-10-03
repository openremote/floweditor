import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { MatSnackBar } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { NodeManagerService } from 'src/app/services/node-manager.service';
import { NodeType, Node } from '@openremote/model';
import { IntegrationService } from 'src/app/services/integration.service';

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
    private integration: IntegrationService,
    private nodeService: NodeManagerService) {
  }

  public loadNodes() {
    this.nodes = this.nodeService.nodes;
    console.log(this.nodes);
    this.loadingStatus = 1;
  }

  ngOnInit() {
    this.loadingStatus = 0;
    this.nodeService.downloadNodeDefinitions(() => { this.loadNodes(); });
  }

  public getNodesFor(type: NodeType) {
    return this.nodes.filter((n) => n.type === type);
  }

  public getAllTypes() {
    return [
      NodeType.INPUT,
      NodeType.PROCESSOR,
      NodeType.OUTPUT,
    ];
  }
}
