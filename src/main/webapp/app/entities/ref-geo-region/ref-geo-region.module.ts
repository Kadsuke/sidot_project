import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoRegionComponent } from './ref-geo-region.component';
import { RefGeoRegionDetailComponent } from './ref-geo-region-detail.component';
import { RefGeoRegionUpdateComponent } from './ref-geo-region-update.component';
import { RefGeoRegionDeleteDialogComponent } from './ref-geo-region-delete-dialog.component';
import { refGeoRegionRoute } from './ref-geo-region.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoRegionRoute)],
  declarations: [RefGeoRegionComponent, RefGeoRegionDetailComponent, RefGeoRegionUpdateComponent, RefGeoRegionDeleteDialogComponent],
  entryComponents: [RefGeoRegionDeleteDialogComponent],
})
export class SidotRefGeoRegionModule {}
