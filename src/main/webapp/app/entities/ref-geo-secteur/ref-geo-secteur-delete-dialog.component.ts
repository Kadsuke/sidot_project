import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';
import { RefGeoSecteurService } from './ref-geo-secteur.service';

@Component({
  templateUrl: './ref-geo-secteur-delete-dialog.component.html',
})
export class RefGeoSecteurDeleteDialogComponent {
  refGeoSecteur?: IRefGeoSecteur;

  constructor(
    protected refGeoSecteurService: RefGeoSecteurService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.refGeoSecteurService.delete(id).subscribe(() => {
      this.eventManager.broadcast('refGeoSecteurListModification');
      this.activeModal.close();
    });
  }
}
