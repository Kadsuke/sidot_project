import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoLocaliteComponent } from './ref-geo-localite.component';
import { RefGeoLocaliteDetailComponent } from './ref-geo-localite-detail.component';
import { RefGeoLocaliteUpdateComponent } from './ref-geo-localite-update.component';
import { RefGeoLocaliteDeleteDialogComponent } from './ref-geo-localite-delete-dialog.component';
import { refGeoLocaliteRoute } from './ref-geo-localite.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoLocaliteRoute)],
  declarations: [
    RefGeoLocaliteComponent,
    RefGeoLocaliteDetailComponent,
    RefGeoLocaliteUpdateComponent,
    RefGeoLocaliteDeleteDialogComponent,
  ],
  entryComponents: [RefGeoLocaliteDeleteDialogComponent],
})
export class SidotRefGeoLocaliteModule {}
