import { Component, OnInit } from '@angular/core';
import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private exporter : ExporterService) { }

  ngOnInit() {
  }

}
