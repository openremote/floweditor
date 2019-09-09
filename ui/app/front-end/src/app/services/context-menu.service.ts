import { Injectable } from '@angular/core';
import { ContextMenu } from '../models/context.menu';
import { InputService } from './input.service';
import { Point } from 'node-structure';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  public open: boolean;
  public contextMenu: ContextMenu;
  public position: Point = new Point(0, 0);

  constructor(private input: InputService) {
    // window.onmouseup = () => { if (this.open) this.open = false; };
  }

  public openMenu() {
    this.position = this.input.mousePos;
    this.open = true;
  }
}
