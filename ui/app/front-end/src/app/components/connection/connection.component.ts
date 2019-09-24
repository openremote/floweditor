import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { ContextMenuService } from 'src/app/services/context-menu.service';
import { Connection } from 'node-structure';
import { IdentityAssigner } from 'src/app/logic/identity.assigner';
import { NodePosition } from '@openremote/model';
import { Utils } from 'src/app/logic/utils';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  @Input() connection: Connection;
  public curviness = 0;

  public fromElement: HTMLElement;
  public toElement: HTMLElement;

  constructor(private project: ProjectService, private context: ContextMenuService) { }

  ngOnInit() {
    const time = timer(0, 16).subscribe(
      (n) => {
        this.curviness = Math.pow(Math.min(1, n * .05), 0.4);

        if (n * .05 > 1) {
          time.unsubscribe();
        }
      }
    );
  }

  public boundingRect1() {
    if (!this.fromElement) {
      this.fromElement = document.getElementById(IdentityAssigner.getSocketElementIdentity(this.connection.from));
      return new DOMRect();
    }
    return this.fromElement.getBoundingClientRect();
  }

  public boundingRect2() {
    if (!this.toElement) {
      this.toElement = document.getElementById(IdentityAssigner.getSocketElementIdentity(this.connection.to));
      return new DOMRect();
    }
    return this.toElement.getBoundingClientRect();
  }

  public x1() {
    const b = this.boundingRect1();
    return b.left + b.width / 2;
  }

  public y1() {
    const b = this.boundingRect1();
    return b.top + b.height / 2;
  }

  public x2() {
    const b = this.boundingRect2();
    return b.left + b.width / 2;
  }

  public y2() {
    const b = this.boundingRect2();
    return b.top + b.height / 2;
  }

  public start() {
    return {x: this.x1(), y: this.y1()};
  }

  public end() {
    return {x: this.x2(), y: this.y2()};
  }

  public s(p: NodePosition): string {
    return p.x.toString() + ',' + p.y.toString();
  }

  public curve(x: number): number {
    // http://robertpenner.com/scripts/easing_equations.txt
    const quadraticEasing = (t: number, b: number, c: number, d: number) => {
      const p = t /= d / 2;
      if ((p) < 1) { return c / 2 * t * t + b; }
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };

    return quadraticEasing(x, 0, 1, 1); // Math.cos(t * Math.PI) / -2 + 0.5;
  }

  public getPointListString(): string {
    const points: NodePosition[] = [];

    const start = this.start();
    const end = this.end();

    points.push(start);

    const c = 24;
    for (let i = 0; i < c; i++) {
      const t = i / c;

      const p = Utils.lerp(start, end, t);
      p.y = Utils.lerpNumber(p.y, Utils.lerpNumber(start.y, end.y, this.curve(t)), this.curviness);
      points.push(p);
    }

    points.push(end);

    return points.map(p => this.s(p)).join(' ');
  }

  public openContextMenu(e: MouseEvent) {
    e.preventDefault();
    this.context.contextMenu = {
      items: [
        {
          label: 'Cut connection',
          action: () => this.project.removeConnection(this.connection)
        }
      ]
    };
    this.context.openMenu();
  }
}
