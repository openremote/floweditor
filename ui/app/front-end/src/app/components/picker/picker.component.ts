import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphInternal } from 'src/app/models/graph.internal';
import { PickerType } from 'src/app/models/picker.type';
import { ProjectService } from 'src/app/services/project.service';
import { InputService } from 'src/app/services/input.service';
import { IntegrationService } from 'src/app/services/integration.service';
import { Asset } from '@openremote/model';
import { MatDialog } from '@angular/material';
import { AssetPickerDialogComponent } from '../asset-picker-dialog/asset-picker-dialog.component';
import { isNullOrUndefined } from 'util';

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
  private chosenAssetDescriptor: Asset;
  private chosenAttributeName = '';

  private attributeNames: string[] = [];

  constructor(
    private project: ProjectService,
    private input: InputService,
    private integration: IntegrationService,
    private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    const elem = (this.view.nativeElement as HTMLElement);

    const inputs = elem.querySelectorAll('input');

    inputs.forEach((e) => {
      e.onblur = () => this.input.focusInputCount--;
      e.onfocus = () => this.input.focusInputCount++;
    });
  }

  ngOnInit() {
    if (this.internal.picker.type === PickerType.Dropdown && this.internal.value == null) {
      this.internal.value = this.internal.picker.options[0].value;
    }

    if (this.internal.picker.type === PickerType.DoubleDropdown && this.internal.value == null) {
      this.doubleDropDownChoice = this.internal.picker.options[0];
      this.resetDoubleDropDownValue();
    }

    if (this.internal.picker.type === PickerType.AssetAttribute) {
      this.integration.refreshAssets();
    }
  }

  private resetAssetAttributeDropDownValue() {
    if (this.chosenAssetDescriptor.attributes != null) {
      this.attributeNames = Object.keys(this.chosenAssetDescriptor.attributes);
      this.chosenAttributeName = this.attributeNames[0];
    } else {
      this.attributeNames = [];
    }
  }

  private setAssetPair() {
    this.internal.value = {
      assetId: this.chosenAssetDescriptor.id,
      attributeName: this.chosenAttributeName
    };
  }

  private openAssetPickerDialog() {
    const d = this.dialog.open(AssetPickerDialogComponent);
    d.afterClosed().subscribe((response: Asset) => {
      if (response) {
        this.chosenAssetDescriptor = response;
        console.log(JSON.stringify(response, null, 2));
        this.resetAssetAttributeDropDownValue();
        this.setAssetPair();
      }
    });
  }

  private resetDoubleDropDownValue() {
    this.internal.value = this.doubleDropDownChoice.options[0].name;
  }
}
