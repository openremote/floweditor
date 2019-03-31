import { Component, OnInit, Input } from '@angular/core';
import { Connection } from 'src/app/models/connection';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  @Input() connection: Connection;

  constructor() { }

  ngOnInit() {
  }

  private boundingRect1() {
    return this.connection.fromElement.getBoundingClientRect();
  }

  private boundingRect2() {
    return this.connection.toElement.getBoundingClientRect();
  }

  private x1() {
    return this.boundingRect1().left;
  }

  private y1() {
    return this.boundingRect1().top;
  }

  private x2() {
    return this.boundingRect2().left;
  }

  private y2() {
    return this.boundingRect2().top;
  }

}

