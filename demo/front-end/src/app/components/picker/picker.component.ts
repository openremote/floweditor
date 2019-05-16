import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphInternal } from 'src/app/models/graph.internal';
import { PickerType } from 'src/app/models/picker.type';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit, AfterViewInit {

  @Input() internal: GraphInternal;
  @ViewChild('view') view: ElementRef;
  PickerType = PickerType;

  private doubleDropDownChoice: any;

  constructor(private project: ProjectService) { }

  ngAfterViewInit(): void {
    const elem = (this.view.nativeElement as HTMLElement);
    elem.onblur = () => this.project.isFocusedOnInput = false;
    elem.onfocus = () => this.project.isFocusedOnInput = true;
  }

  ngOnInit() {
    if (this.internal.picker.type === PickerType.Dropdown && this.internal.value == null) {
      this.internal.value = this.internal.picker.options[0].value;
    }

    if (this.internal.picker.type === PickerType.DoubleDropdown && this.internal.value == null) {
      this.doubleDropDownChoice = this.internal.picker.options[0];
      this.resetDoubleDropDownValue();
    }
  }

  private resetDoubleDropDownValue() {
    this.internal.value = this.doubleDropDownChoice.options[0].name;
  }
}
