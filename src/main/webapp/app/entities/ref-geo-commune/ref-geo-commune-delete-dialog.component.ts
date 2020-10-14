import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';
import { RefGeoCommuneService } from './ref-geo-commune.service';

@Component({
  templateUrl: './ref-geo-commune-delete-dialog.component.html',
})
export class RefGeoCommuneDeleteDialogComponent {
  refGeoCommune?: IRefGeoCommune;

  constructor(
    protected refGeoCommuneService: RefGeoCommuneService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoCommuneService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoCommuneListModification');
      this.activeModal.close();
    });
  }
}
