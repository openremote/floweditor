import { Component, OnInit, Input } from '@angular/core';
import { ContextMenu } from 'src/app/models/context.menu';
import { ProjectService } from 'src/app/services/project.service';
import { SelectionService } from 'src/app/services/selection.service';
import { ContextMenuService } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent implements OnInit {

  @Input() contextMenu: ContextMenu;
  @Input() open: boolean;

  constructor(
    public project: ProjectService,
    public select: SelectionService,
    public context: ContextMenuService) {
    this.contextMenu = new ContextMenu();
  }

  ngOnInit() {
  }
}
