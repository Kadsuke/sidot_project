import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoParcelle, RefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';
import { RefGeoParcelleService } from './ref-geo-parcelle.service';
import { IRefGeoLot } from 'app/shared/model/ref-geo-lot.model';
import { RefGeoLotService } from 'app/entities/ref-geo-lot/ref-geo-lot.service';

@Component({
  selector: 'jhi-ref-geo-parcelle-update',
  templateUrl: './ref-geo-parcelle-update.component.html',
})
export class RefGeoParcelleUpdateComponent implements OnInit {
  isSaving = false;
  lots: IRefGeoLot[] = [];

  editForm = this.fb.group({
    id: [],
    parcelleName: [],
    lot: [],
  });

  constructor(
    protected refGeoParcelleService: RefGeoParcelleService,
    protected refGeoLotService: RefGeoLotService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoParcelle }) => {
      this.updateForm(refGeoParcelle);

      this.refGeoLotService
        .query({ filter: 'refgeoparcelle-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoLot[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoLot[]) => {
          if (!refGeoParcelle.lot || !refGeoParcelle.lot.id) {
            this.lots = resBody;
          } else {
            this.refGeoLotService
              .find(refGeoParcelle.lot.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoLot>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoLot[]) => (this.lots = concatRes));
          }
        });
    });
  }

  updateForm(refGeoParcelle: IRefGeoParcelle): void {
    this.editForm.patchValue({
      id: refGeoParcelle.id,
      parcelleName: refGeoParcelle.parcelleName,
      lot: refGeoParcelle.lot,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoParcelle = this.createFromForm();
    if (refGeoParcelle.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoParcelleService.update(refGeoParcelle));
    } else {
      this.subscribeToSaveResponse(this.refGeoParcelleService.create(refGeoParcelle));
    }
  }

  private createFromForm(): IRefGeoParcelle {
    return {
      ...new RefGeoParcelle(),
      id: this.editForm.get(['id'])!.value,
      parcelleName: this.editForm.get(['parcelleName'])!.value,
      lot: this.editForm.get(['lot'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoParcelle>>): void {
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

  trackById(index: number, item: IRefGeoLot): any {
    return item.id;
  }
}
