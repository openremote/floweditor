import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectService } from 'src/app/services/project.service';
import { CopyMachine } from 'src/app/logic/copy.machine';
import { GraphNode, GraphNodeType } from 'node-structure';
import { NodeManagerService } from 'src/app/services/node-manager.service';

@Component({
  selector: 'app-toolpanel',
  templateUrl: './toolpanel.component.html',
  styleUrls: ['./toolpanel.component.css']
})
export class ToolpanelComponent implements OnInit {
  public nodes: GraphNode[] = [];
  public loadingStatus = 0;
  public error: string;
  private GraphNodeType = GraphNodeType;

  constructor(
    public restService: RestService,
    private snackBar: MatSnackBar,
    private project: ProjectService,
    private nodeService: NodeManagerService) {
  }

  public loadNodes() {
    this.loadingStatus = 0;

    this.nodes = this.nodeService.translator.getAllNodes();
    console.log(this.nodes);
    this.loadingStatus = 1;
    /*
    const nodeObservable = this.restService.getAllNodes();
    nodeObservable.subscribe(
      (data: GraphNode[]) => this.nodes = data.map(x => Object.assign(new GraphNode(), x)),
      (e: HttpErrorResponse) => {
        this.loadingStatus = 2;
        this.error = 'Failure';
      },
      () => {
        this.loadingStatus = 1;

        const nodes = this.getNodesFor(GraphNodeType.Then);
        nodes.forEach(n => {
          const node = CopyMachine.copy(n);

          const workspace = document.getElementById('workspace');
          const box = workspace.getBoundingClientRect();

          node.position = { x: box.width / 2, y: box.height / 2 };

          this.project.nodes.push(node);
        });
      }
    );*/
  }

  ngOnInit() {
    this.loadNodes();
  }

  private getNodesFor(type: GraphNodeType) {
    return this.nodes.filter((n) => n.type === type);
  }

  private getAllTypes() {
    return [
      GraphNodeType.Input,
      GraphNodeType.Processor,
      GraphNodeType.Output,
      // GraphNodeType.Then,
    ];
  }
}
