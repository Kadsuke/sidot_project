import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoSectionComponent } from './ref-geo-section.component';
import { RefGeoSectionDetailComponent } from './ref-geo-section-detail.component';
import { RefGeoSectionUpdateComponent } from './ref-geo-section-update.component';
import { RefGeoSectionDeleteDialogComponent } from './ref-geo-section-delete-dialog.component';
import { refGeoSectionRoute } from './ref-geo-section.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoSectionRoute)],
  declarations: [RefGeoSectionComponent, RefGeoSectionDetailComponent, RefGeoSectionUpdateComponent, RefGeoSectionDeleteDialogComponent],
  entryComponents: [RefGeoSectionDeleteDialogComponent],
})
export class SidotRefGeoSectionModule {}
