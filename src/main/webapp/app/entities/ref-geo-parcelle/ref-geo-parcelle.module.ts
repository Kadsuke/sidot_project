import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoParcelleComponent } from './ref-geo-parcelle.component';
import { RefGeoParcelleDetailComponent } from './ref-geo-parcelle-detail.component';
import { RefGeoParcelleUpdateComponent } from './ref-geo-parcelle-update.component';
import { RefGeoParcelleDeleteDialogComponent } from './ref-geo-parcelle-delete-dialog.component';
import { refGeoParcelleRoute } from './ref-geo-parcelle.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoParcelleRoute)],
  declarations: [
    RefGeoParcelleComponent,
    RefGeoParcelleDetailComponent,
    RefGeoParcelleUpdateComponent,
    RefGeoParcelleDeleteDialogComponent,
  ],
  entryComponents: [RefGeoParcelleDeleteDialogComponent],
})
export class SidotRefGeoParcelleModule {}
