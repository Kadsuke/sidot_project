import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoProvince } from 'app/shared/model/ref-geo-province.model';
import { RefGeoProvinceService } from './ref-geo-province.service';

@Component({
  templateUrl: './ref-geo-province-delete-dialog.component.html',
})
export class RefGeoProvinceDeleteDialogComponent {
  refGeoProvince?: IRefGeoProvince;

  constructor(
    protected refGeoProvinceService: RefGeoProvinceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoProvinceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoProvinceListModification');
      this.activeModal.close();
    });
  }
}
