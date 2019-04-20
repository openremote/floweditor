import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphNode } from 'src/app/models/graph.node';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionService } from 'src/app/services/selection.service';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.css']
})
export class GraphNodeComponent implements OnInit, AfterViewInit {
  @Input() node: GraphNode;
  @ViewChild('inputSockets') inputSockets: ElementRef;
  @ViewChild('outputSockets') outputSockets: ElementRef;
  @ViewChild('view') view: ElementRef;

  constructor(private project: ProjectService, private selection: SelectionService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.node.position != null) {
      (this.view.nativeElement as HTMLElement).style.transform = `translate3d(${this.node.position.x}px, ${this.node.position.y}px, 0)`;
    }
  }
}
