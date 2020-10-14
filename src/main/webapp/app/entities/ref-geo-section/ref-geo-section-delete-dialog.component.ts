import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoSection } from 'app/shared/model/ref-geo-section.model';
import { RefGeoSectionService } from './ref-geo-section.service';

@Component({
  templateUrl: './ref-geo-section-delete-dialog.component.html',
})
export class RefGeoSectionDeleteDialogComponent {
  refGeoSection?: IRefGeoSection;

  constructor(
    protected refGeoSectionService: RefGeoSectionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoSectionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoSectionListModification');
      this.activeModal.close();
    });
  }
}
