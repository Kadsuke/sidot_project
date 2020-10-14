import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoCommuneComponent } from './ref-geo-commune.component';
import { RefGeoCommuneDetailComponent } from './ref-geo-commune-detail.component';
import { RefGeoCommuneUpdateComponent } from './ref-geo-commune-update.component';
import { RefGeoCommuneDeleteDialogComponent } from './ref-geo-commune-delete-dialog.component';
import { refGeoCommuneRoute } from './ref-geo-commune.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoCommuneRoute)],
  declarations: [RefGeoCommuneComponent, RefGeoCommuneDetailComponent, RefGeoCommuneUpdateComponent, RefGeoCommuneDeleteDialogComponent],
  entryComponents: [RefGeoCommuneDeleteDialogComponent],
})
export class SidotRefGeoCommuneModule {}
