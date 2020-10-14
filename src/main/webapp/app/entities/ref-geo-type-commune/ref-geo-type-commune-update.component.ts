import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoTypeCommune, RefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';
import { RefGeoTypeCommuneService } from './ref-geo-type-commune.service';
import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';
import { RefGeoCommuneService } from 'app/entities/ref-geo-commune/ref-geo-commune.service';

@Component({
  selector: 'jhi-ref-geo-type-commune-update',
  templateUrl: './ref-geo-type-commune-update.component.html',
})
export class RefGeoTypeCommuneUpdateComponent implements OnInit {
  isSaving = false;
  communes: IRefGeoCommune[] = [];

  editForm = this.fb.group({
    id: [],
    typeName: [],
    commune: [],
  });

  constructor(
    protected refGeoTypeCommuneService: RefGeoTypeCommuneService,
    protected refGeoCommuneService: RefGeoCommuneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoTypeCommune }) => {
      this.updateForm(refGeoTypeCommune);

      this.refGeoCommuneService
        .query({ filter: 'refgeotypecommune-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoCommune[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoCommune[]) => {
          if (!refGeoTypeCommune.commune || !refGeoTypeCommune.commune.id) {
            this.communes = resBody;
          } else {
            this.refGeoCommuneService
              .find(refGeoTypeCommune.commune.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoCommune>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoCommune[]) => (this.communes = concatRes));
          }
        });
    });
  }

  updateForm(refGeoTypeCommune: IRefGeoTypeCommune): void {
    this.editForm.patchValue({
      id: refGeoTypeCommune.id,
      typeName: refGeoTypeCommune.typeName,
      commune: refGeoTypeCommune.commune,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoTypeCommune = this.createFromForm();
    if (refGeoTypeCommune.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoTypeCommuneService.update(refGeoTypeCommune));
    } else {
      this.subscribeToSaveResponse(this.refGeoTypeCommuneService.create(refGeoTypeCommune));
    }
  }

  private createFromForm(): IRefGeoTypeCommune {
    return {
      ...new RefGeoTypeCommune(),
      id: this.editForm.get(['id'])!.value,
      typeName: this.editForm.get(['typeName'])!.value,
      commune: this.editForm.get(['commune'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoTypeCommune>>): void {
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

  trackById(index: number, item: IRefGeoCommune): any {
    return item.id;
  }
}
