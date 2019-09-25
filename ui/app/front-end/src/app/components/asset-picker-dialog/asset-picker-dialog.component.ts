import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Asset } from '@openremote/model';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-asset-picker-dialog',
  templateUrl: './asset-picker-dialog.component.html',
  styleUrls: ['./asset-picker-dialog.component.css']
})
export class AssetPickerDialogComponent implements AfterViewInit {
  public topLevel: Asset[] = [];
  public status = 0;
  constructor(public dialogRef: MatDialogRef<AssetPickerDialogComponent>, private rest: RestService) { }

  async ngAfterViewInit() {
    this.status = 0;
    try {
      const resource = await this.rest.getAssetResource();
      const assets = await resource.queryAssets({
        select: {
          excludeAttributes: false,
          excludeParentInfo: false,
          excludeAttributeMeta: false,
        }
      });

      this.topLevel = assets.data.filter((p) => p.parentId == null);
      this.status = 1;
    } catch {
      this.status = -1;
    }
  }

  close(asset: Asset) {
    this.dialogRef.close(asset);
  }
}
