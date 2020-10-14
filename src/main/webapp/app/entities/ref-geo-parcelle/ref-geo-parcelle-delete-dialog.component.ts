import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';
import { RefGeoParcelleService } from './ref-geo-parcelle.service';

@Component({
  templateUrl: './ref-geo-parcelle-delete-dialog.component.html',
})
export class RefGeoParcelleDeleteDialogComponent {
  refGeoParcelle?: IRefGeoParcelle;

  constructor(
    protected refGeoParcelleService: RefGeoParcelleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoParcelleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoParcelleListModification');
      this.activeModal.close();
    });
  }
}
