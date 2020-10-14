import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';
import { RefGeoTypeCommuneService } from './ref-geo-type-commune.service';

@Component({
  templateUrl: './ref-geo-type-commune-delete-dialog.component.html',
})
export class RefGeoTypeCommuneDeleteDialogComponent {
  refGeoTypeCommune?: IRefGeoTypeCommune;

  constructor(
    protected refGeoTypeCommuneService: RefGeoTypeCommuneService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoTypeCommuneService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoTypeCommuneListModification');
      this.activeModal.close();
    });
  }
}
