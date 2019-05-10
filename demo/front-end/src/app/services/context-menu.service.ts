import { Injectable } from '@angular/core';
import { ContextMenu } from '../models/context.menu';

@Injectable({
  providedIn: 'root'
})
export class ContextMenuService {
  public open: boolean;
  public contextMenu: ContextMenu;
  constructor() { }
}
