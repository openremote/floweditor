import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Asset } from '@openremote/model';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-asset-picker-dialog',
  templateUrl: './asset-picker-dialog.component.html',
  styleUrls: ['./asset-picker-dialog.component.css']
})
export class AssetPickerDialogComponent implements OnInit {
  private topLevel: Asset[] = [];
  constructor(public dialogRef: MatDialogRef<AssetPickerDialogComponent>, private integration: IntegrationService) { }

  ngOnInit() {
    this.integration.refreshAssets();
    this.integration.refreshAssetDescriptors();
    this.topLevel = this.integration.assets.filter((p) => p.parentId == null);
    this.topLevel.forEach(element => {
      console.log(element);
    });
  }

  close(asset: Asset) {
    this.dialogRef.close(asset);
  }
}
