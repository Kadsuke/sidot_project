import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoProvinceComponent } from './ref-geo-province.component';
import { RefGeoProvinceDetailComponent } from './ref-geo-province-detail.component';
import { RefGeoProvinceUpdateComponent } from './ref-geo-province-update.component';
import { RefGeoProvinceDeleteDialogComponent } from './ref-geo-province-delete-dialog.component';
import { refGeoProvinceRoute } from './ref-geo-province.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoProvinceRoute)],
  declarations: [
    RefGeoProvinceComponent,
    RefGeoProvinceDetailComponent,
    RefGeoProvinceUpdateComponent,
    RefGeoProvinceDeleteDialogComponent,
  ],
  entryComponents: [RefGeoProvinceDeleteDialogComponent],
})
export class SidotRefGeoProvinceModule {}
