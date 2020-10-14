import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoRegion } from 'app/shared/model/ref-geo-region.model';
import { RefGeoRegionService } from './ref-geo-region.service';

@Component({
  templateUrl: './ref-geo-region-delete-dialog.component.html',
})
export class RefGeoRegionDeleteDialogComponent {
  refGeoRegion?: IRefGeoRegion;

  constructor(
    protected refGeoRegionService: RefGeoRegionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoRegionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoRegionListModification');
      this.activeModal.close();
    });
  }
}
