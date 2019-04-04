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
    const b = this.boundingRect1();
    return b.left + b.width / 2;
  }

  private y1() {
    const b = this.boundingRect1();
    return b.top + b.height / 2;
  }

  private x2() {
    const b = this.boundingRect2();
    return b.left + b.width / 2;
  }

  private y2() {
    const b = this.boundingRect2();
    return b.top + b.height / 2;
  }

}

