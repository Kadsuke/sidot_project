import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoLot, RefGeoLot } from 'app/shared/model/ref-geo-lot.model';
import { RefGeoLotService } from './ref-geo-lot.service';
import { IRefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';
import { RefGeoParcelleService } from 'app/entities/ref-geo-parcelle/ref-geo-parcelle.service';

@Component({
  selector: 'jhi-ref-geo-lot-update',
  templateUrl: './ref-geo-lot-update.component.html',
})
export class RefGeoLotUpdateComponent implements OnInit {
  isSaving = false;
  parcelles: IRefGeoParcelle[] = [];

  editForm = this.fb.group({
    id: [],
    lotName: [],
    parcelle: [],
  });

  constructor(
    protected refGeoLotService: RefGeoLotService,
    protected refGeoParcelleService: RefGeoParcelleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoLot }) => {
      this.updateForm(refGeoLot);

      this.refGeoParcelleService
        .query({ filter: 'refgeolot-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoParcelle[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoParcelle[]) => {
          if (!refGeoLot.parcelle || !refGeoLot.parcelle.id) {
            this.parcelles = resBody;
          } else {
            this.refGeoParcelleService
              .find(refGeoLot.parcelle.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoParcelle>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoParcelle[]) => (this.parcelles = concatRes));
          }
        });
    });
  }

  updateForm(refGeoLot: IRefGeoLot): void {
    this.editForm.patchValue({
      id: refGeoLot.id,
      lotName: refGeoLot.lotName,
      parcelle: refGeoLot.parcelle,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoLot = this.createFromForm();
    if (refGeoLot.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoLotService.update(refGeoLot));
    } else {
      this.subscribeToSaveResponse(this.refGeoLotService.create(refGeoLot));
    }
  }

  private createFromForm(): IRefGeoLot {
    return {
      ...new RefGeoLot(),
      id: this.editForm.get(['id'])!.value,
      lotName: this.editForm.get(['lotName'])!.value,
      parcelle: this.editForm.get(['parcelle'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoLot>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IRefGeoParcelle): any {
    return item.id;
  }
}
