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
  constructor(public dialogRef: MatDialogRef<AssetPickerDialogComponent>, private integration: IntegrationService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.integration.refreshAssets((e) => {
      this.topLevel = e.filter((p) => p.parentId == null);
    });
  }

  close(asset: Asset) {
    this.dialogRef.close(asset);
  }
}
