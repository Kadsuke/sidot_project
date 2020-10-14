import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { RefGeoSecteurComponent } from './ref-geo-secteur.component';
import { RefGeoSecteurDetailComponent } from './ref-geo-secteur-detail.component';
import { RefGeoSecteurUpdateComponent } from './ref-geo-secteur-update.component';
import { RefGeoSecteurDeleteDialogComponent } from './ref-geo-secteur-delete-dialog.component';
import { refGeoSecteurRoute } from './ref-geo-secteur.route';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild(refGeoSecteurRoute)],
  declarations: [RefGeoSecteurComponent, RefGeoSecteurDetailComponent, RefGeoSecteurUpdateComponent, RefGeoSecteurDeleteDialogComponent],
  entryComponents: [RefGeoSecteurDeleteDialogComponent],
})
export class SidotRefGeoSecteurModule {}
