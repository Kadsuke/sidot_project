import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoLotComponent } from './ref-geo-lot.component';
import { RefGeoLotDetailComponent } from './ref-geo-lot-detail.component';
import { RefGeoLotUpdateComponent } from './ref-geo-lot-update.component';
import { RefGeoLotDeleteDialogComponent } from './ref-geo-lot-delete-dialog.component';
import { refGeoLotRoute } from './ref-geo-lot.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoLotRoute)],
  declarations: [RefGeoLotComponent, RefGeoLotDetailComponent, RefGeoLotUpdateComponent, RefGeoLotDeleteDialogComponent],
  entryComponents: [RefGeoLotDeleteDialogComponent],
})
export class SidotRefGeoLotModule {}
