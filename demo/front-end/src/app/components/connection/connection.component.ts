import { Component, OnInit, Input } from '@angular/core';
import { Connection } from 'src/app/models/connection';
import { Point } from 'src/app/models/point';
import { timer } from 'rxjs';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  @Input() connection: Connection;
  private curviness = 0;

  constructor() { }

  ngOnInit() {

    const time = timer(0, 16);
    time.subscribe(
      (n) => {
        this.curviness = Math.pow(Math.min(1, n * .05), 0.4);
      }
    );
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

  private start() {
    return new Point(this.x1(), this.y1());
  }

  private end() {
    return new Point(this.x2(), this.y2());
  }

  private s(p: Point): string {
    return p.x.toString() + ',' + p.y.toString();
  }

  // http://robertpenner.com/scripts/easing_equations.txt
  quadtratic_easing(t, b, c, d) {
    if ((t /= d / 2) < 1) { return c/2*t*t + b; }
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  private curve(t: number): number {
    return this.quadtratic_easing(t, 0, 1, 1); // Math.cos(t * Math.PI) / -2 + 0.5;
  }

  private getPointListString(): string {
    const points: Point[] = [];

    const start = this.start();
    const end = this.end();

    points.push(start);

    const c = 24;
    for (let i = 0; i < c; i++) {
      const t = i / c;

      const p = Point.lerp(start, end, t);
      p.y = Point.lerpNumber(p.y, Point.lerpNumber(start.y, end.y, this.curve(t)), this.curviness);
      points.push(p);
    }

    points.push(end);

    return points.map(p => this.s(p)).join(' ');
  }

}

