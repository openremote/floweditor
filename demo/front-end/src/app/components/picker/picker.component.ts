import { Component, OnInit, Input } from '@angular/core';
import { GraphInternal } from 'src/app/models/graph.internal';
import { Picker } from 'src/app/models/picker';
import { PickerType } from 'src/app/models/picker.type';
import { GraphDataTypes } from 'src/app/models/graph.data.types';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {

  @Input() internal: GraphInternal;
  PickerType = PickerType;

  private doubleDropDownChoice: any;

  constructor() {

  }

  ngOnInit() {
    if (this.internal.picker.type === PickerType.Dropdown) {
      this.internal.value = this.internal.picker.options[0].value;
    }

    if (this.internal.picker.type === PickerType.DoubleDropdown) {
      this.doubleDropDownChoice = this.internal.picker.options[0];
      this.resetDoubleDropDownValue();
    }
  }

  private resetDoubleDropDownValue() {
    console.log("tehee");
    this.internal.value = this.doubleDropDownChoice.options[0].name;
  }
}
