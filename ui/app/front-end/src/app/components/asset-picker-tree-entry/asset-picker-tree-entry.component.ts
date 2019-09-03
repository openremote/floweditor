import { Component, OnInit, Input } from '@angular/core';
import { Asset, AssetQuerySelect, AssetType } from '@openremote/model';
import { IntegrationService } from 'src/app/services/integration.service';
import { MatDialogRef } from '@angular/material';
import { AssetPickerDialogComponent } from '../asset-picker-dialog/asset-picker-dialog.component';

@Component({
  selector: 'app-asset-picker-tree-entry',
  templateUrl: './asset-picker-tree-entry.component.html',
  styleUrls: ['./asset-picker-tree-entry.component.css']
})
export class AssetPickerTreeEntryComponent implements OnInit {
  @Input() dialogRef: MatDialogRef<AssetPickerDialogComponent>;
  @Input() asset: Asset;

  public children: Asset[] = [];
  public isLoaded = false;
  public hasChildren = false;
  public isExpanded = false;

  constructor(private integration: IntegrationService) { }

  ngOnInit() {
    this.load();
  }

  public load() {

    this.integration.queryAssets({
      select: {
        excludeParentInfo: false,
        excludeAttributes: false
      },
      parents: [
        {
          id: this.asset.id
        }
      ]
    }, (assets) => {
      this.hasChildren = assets.length > 0;
      this.children = assets;
      this.isLoaded = true;
    });
  }

  choose() {
    this.dialogRef.close(this.asset);
  }

  public expandCollapse() {
    this.isExpanded = !this.isExpanded;
  }

}
