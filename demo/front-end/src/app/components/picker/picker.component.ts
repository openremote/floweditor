import { Component, OnInit, Input } from '@angular/core';
import { GraphInternal } from 'src/app/models/GraphInternal';
import { Picker } from 'src/app/models/picker';
import { PickerType } from 'src/app/models/pickertype';
import { GraphDataTypes } from 'src/app/models/graphdatatypes';

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
    if (this.internal.picker.type == PickerType.Dropdown) {
      this.internal.value = this.internal.picker.options[0];
    }
  }

}
