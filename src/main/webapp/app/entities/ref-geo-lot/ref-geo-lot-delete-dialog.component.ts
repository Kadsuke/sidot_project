import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoLot } from 'app/shared/model/ref-geo-lot.model';
import { RefGeoLotService } from './ref-geo-lot.service';

@Component({
  templateUrl: './ref-geo-lot-delete-dialog.component.html',
})
export class RefGeoLotDeleteDialogComponent {
  refGeoLot?: IRefGeoLot;

  constructor(protected refGeoLotService: RefGeoLotService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoLotService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoLotListModification');
      this.activeModal.close();
    });
  }
}
