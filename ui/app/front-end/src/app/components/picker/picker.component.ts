import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GraphInternal } from 'src/app/models/graph.internal';
import { PickerType } from 'src/app/models/picker.type';
import { ProjectService } from 'src/app/services/project.service';
import { InputService } from 'src/app/services/input.service';
import { IntegrationService } from 'src/app/services/integration.service';
import { Asset, AssetState, MetaItemType } from '@openremote/model';
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

  public doubleDropDownChoice: any;
  public chosenAsset: Asset;
  public chosenAttributeName = '';

  public attributeNames: string[] = [];

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
    if (this.chosenAsset.attributes != null) {
      this.attributeNames = [];
      for (const att of Object.keys(this.chosenAsset.attributes)) {
        const meta = (this.chosenAsset.attributes[att] as AssetState).meta;
        console.log(meta);
        if (meta.find(m => m.name === MetaItemType.RULE_STATE.urn && m.value === true)) {
          this.attributeNames.push(att);
        }
      }
      this.chosenAttributeName = this.attributeNames[0];
    } else {
      this.attributeNames = [];
    }
  }

  private setAssetPair() {
    this.internal.value = {
      assetId: this.chosenAsset.id,
      attributeName: this.chosenAttributeName
    };
  }

  private openAssetPickerDialog() {
    const d = this.dialog.open(AssetPickerDialogComponent);
    d.afterClosed().subscribe((response: Asset) => {
      if (response) {
        this.chosenAsset = response;
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