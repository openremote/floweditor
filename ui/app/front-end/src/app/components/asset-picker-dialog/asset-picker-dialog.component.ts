import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Asset } from '@openremote/model';
import { IntegrationService } from 'src/app/services/integration.service';

@Component({
  selector: 'app-asset-picker-dialog',
  templateUrl: './asset-picker-dialog.component.html',
  styleUrls: ['./asset-picker-dialog.component.css']
})
export class AssetPickerDialogComponent implements OnInit, AfterViewInit {
  public topLevel: Asset[] = [];
  public status = 0;
  constructor(public dialogRef: MatDialogRef<AssetPickerDialogComponent>, private integration: IntegrationService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.status = 0;
    this.integration.refreshAssets((e) => {
      this.topLevel = e.filter((p) => p.parentId == null);
      this.status = 1;
    }, () => {
      this.status = -1;
    });
  }

  close(asset: Asset) {
    this.dialogRef.close(asset);
  }
}
