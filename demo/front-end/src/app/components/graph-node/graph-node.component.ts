import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphNode } from 'src/app/models/graphnode';
import { ProjectService } from 'src/app/services/project.service';
import { GraphSocket } from 'src/app/models/graphsocket';

@Component({
  selector: 'app-graph-node',
  templateUrl: './graph-node.component.html',
  styleUrls: ['./graph-node.component.css']
})
export class GraphNodeComponent implements OnInit, AfterViewInit {
  @Input() node: GraphNode;
  @ViewChild('inputSockets') inputSockets: ElementRef;
  @ViewChild('outputSockets') outputSockets: ElementRef;

  constructor(private project : ProjectService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    
  }
}
