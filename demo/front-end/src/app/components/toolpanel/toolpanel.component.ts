import { Component, OnInit } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';
import { RestService } from 'src/app/services/rest.service';
import { MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-toolpanel',
  templateUrl: './toolpanel.component.html',
  styleUrls: ['./toolpanel.component.css']
})
export class ToolpanelComponent implements OnInit {
  public nodes: GraphNode[] = [];
  public loadingStatus = 0;
  private error: string;

  constructor(public restService: RestService, private snackBar: MatSnackBar) {
    const nodeObservable = this.restService.getAllNodes();
    nodeObservable.subscribe(
      (data: GraphNode[]) => this.nodes = data.map(x => Object.assign(new GraphNode(x.name, x.type), x)),
      (e: HttpErrorResponse) => {
        snackBar.open('Couldn\'t load nodes from server', 'X');
        this.loadingStatus = 2;
        this.error = e.statusText;
      },
      () => this.loadingStatus = 1
    );
  }

  ngOnInit() {
  }

}
