import { Component, OnInit, Input } from '@angular/core';
import { GraphInternal } from 'src/app/models/GraphInternal';
import { Picker } from 'src/app/models/Picker';
import { PickerType } from 'src/app/models/PickerType';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {

  @Input() internal: GraphInternal;
  PickerType = PickerType;

  constructor() {

  }

  ngOnInit() {
  }

}
