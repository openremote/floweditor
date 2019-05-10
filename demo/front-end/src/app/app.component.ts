import { Component } from '@angular/core';
import { InputService } from './services/input.service';
import { ContextMenuService } from './services/context-menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-end';

  constructor(private context: ContextMenuService) {

  }
}
