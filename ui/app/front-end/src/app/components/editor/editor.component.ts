import { Component, OnInit } from '@angular/core';
import { ContextMenuService } from 'src/app/services/context-menu.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  constructor(private context: ContextMenuService) { }

  ngOnInit() {
  }

}
