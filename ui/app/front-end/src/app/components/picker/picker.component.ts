import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { InputService } from 'src/app/services/input.service';
import { IntegrationService } from 'src/app/services/integration.service';
import { Asset, AssetState, MetaItemType, PickerType, NodeInternal, AssetAttributeInternalValue } from '@openremote/model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AssetPickerDialogComponent } from '../asset-picker-dialog/asset-picker-dialog.component';
import { RestService } from 'src/app/services/rest.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit, AfterViewInit {

  @Input() internal: NodeInternal;
  @ViewChild('view') view: ElementRef;

  public doubleDropDownChoice: any;
  public chosenAsset: Asset;
  public chosenAttributeName = '';

  public attributeNames: string[] = [];

  constructor(
    private snack: MatSnackBar,
    private project: ProjectService,
    private input: InputService,
    private rest: RestService,
    private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    const elem = (this.view.nativeElement as HTMLElement);

    const inputs = elem.querySelectorAll('input');
    inputs.forEach((e) => {
      e.onblur = () => this.input.focusInputCount--;
      e.onfocus = () => {
        this.project.isInUnsavedState = true;
        return this.input.focusInputCount++;
      };
    });

    const textareas = elem.querySelectorAll('textarea');
    textareas.forEach((e) => {
      e.onblur = () => this.input.focusInputCount--;
      e.onfocus = () => {
        this.project.isInUnsavedState = true;
        return this.input.focusInputCount++;
      };
    });
  }

  ngOnInit() {
    if (this.internal.picker.type === PickerType.DROPDOWN && this.internal.value == null) {
      this.internal.value = this.internal.picker.options[0].value;
    }

    if (this.internal.picker.type === PickerType.DOUBLE_DROPDOWN && this.internal.value == null) {
      this.doubleDropDownChoice = this.internal.picker.options[0];
      this.resetDoubleDropDownValue();
    }

    if (this.internal.picker.type === PickerType.ASSET_ATTRIBUTE) {
      if (this.internal.value != null) {

        this.rest.getAssetResource().then(a => {
          a.queryAssets({
            ids: [this.internal.value.assetId],
            select: {
              excludeAttributes: false,
              excludeAttributeMeta: false
            }
          }).then((assets) => {
            if (assets.data.length === 0) {
              this.snack.open('Missing asset in node setup', 'Dismiss');
              return;
            }
            this.chosenAsset = assets.data[0];
            console.log(this.chosenAsset);
            this.resetAssetAttributeDropDownValue();
            this.chosenAttributeName = this.internal.value.attributeName;

            console.log(this.internal.value);
          });
        });
      }
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
    const value: AssetAttributeInternalValue = {
      assetId: this.chosenAsset.id,
      attributeName: this.chosenAttributeName
    };
    this.internal.value = value;
  }

  public openAssetPickerDialog() {
    const d = this.dialog.open(AssetPickerDialogComponent);
    d.afterClosed().subscribe((response: Asset) => {
      if (response) {
        this.chosenAsset = response;
        console.log(JSON.stringify(response, null, 2));
        this.resetAssetAttributeDropDownValue();
        this.setAssetPair();
      } else {
        const v: AssetAttributeInternalValue = {
          assetId: this.chosenAsset.id,
          attributeName: ''
        };
        this.internal.value = v;
      }
    });
  }

  private resetDoubleDropDownValue() {
    this.internal.value = this.doubleDropDownChoice.options[0].name;
  }
}
