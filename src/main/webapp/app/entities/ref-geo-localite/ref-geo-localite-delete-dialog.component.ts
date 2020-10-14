import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';
import { RefGeoLocaliteService } from './ref-geo-localite.service';

@Component({
  templateUrl: './ref-geo-localite-delete-dialog.component.html',
})
export class RefGeoLocaliteDeleteDialogComponent {
  refGeoLocalite?: IRefGeoLocalite;

  constructor(
    protected refGeoLocaliteService: RefGeoLocaliteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoLocaliteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoLocaliteListModification');
      this.activeModal.close();
    });
  }
}
