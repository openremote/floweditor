import { Component, OnInit } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-toolpanel',
  templateUrl: './toolpanel.component.html',
  styleUrls: ['./toolpanel.component.css']
})
export class ToolpanelComponent implements OnInit {
  public nodes: GraphNode[] = [];

  constructor(public restService: RestService) {
    const nodeObservable = this.restService.getAllNodes();
    nodeObservable.subscribe(
      (data: GraphNode[]) => this.nodes = data.map(x=>Object.assign(new GraphNode(x.name, x.type), x))
    );
  }

  ngOnInit() {
  }

}
