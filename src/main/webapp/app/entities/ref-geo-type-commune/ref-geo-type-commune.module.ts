import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoTypeCommuneComponent } from './ref-geo-type-commune.component';
import { RefGeoTypeCommuneDetailComponent } from './ref-geo-type-commune-detail.component';
import { RefGeoTypeCommuneUpdateComponent } from './ref-geo-type-commune-update.component';
import { RefGeoTypeCommuneDeleteDialogComponent } from './ref-geo-type-commune-delete-dialog.component';
import { refGeoTypeCommuneRoute } from './ref-geo-type-commune.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoTypeCommuneRoute)],
  declarations: [
    RefGeoTypeCommuneComponent,
    RefGeoTypeCommuneDetailComponent,
    RefGeoTypeCommuneUpdateComponent,
    RefGeoTypeCommuneDeleteDialogComponent,
  ],
  entryComponents: [RefGeoTypeCommuneDeleteDialogComponent],
})
export class SidotRefGeoTypeCommuneModule {}
