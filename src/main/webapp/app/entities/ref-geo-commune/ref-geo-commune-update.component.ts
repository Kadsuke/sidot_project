import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoCommune, RefGeoCommune } from 'app/shared/model/ref-geo-commune.model';
import { RefGeoCommuneService } from './ref-geo-commune.service';
import { IRefGeoProvince } from 'app/shared/model/ref-geo-province.model';
import { RefGeoProvinceService } from 'app/entities/ref-geo-province/ref-geo-province.service';
import { IRefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';
import { RefGeoTypeCommuneService } from 'app/entities/ref-geo-type-commune/ref-geo-type-commune.service';

type SelectableEntity = IRefGeoProvince | IRefGeoTypeCommune;

@Component({
  selector: 'jhi-ref-geo-commune-update',
  templateUrl: './ref-geo-commune-update.component.html',
})
export class RefGeoCommuneUpdateComponent implements OnInit {
  isSaving = false;
  provinces: IRefGeoProvince[] = [];
  typecommunes: IRefGeoTypeCommune[] = [];

  editForm = this.fb.group({
    id: [],
    communeName: [],
    province: [],
    typecommune: [],
  });

  constructor(
    protected refGeoCommuneService: RefGeoCommuneService,
    protected refGeoProvinceService: RefGeoProvinceService,
    protected refGeoTypeCommuneService: RefGeoTypeCommuneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoCommune }) => {
      this.updateForm(refGeoCommune);

      this.refGeoProvinceService
        .query({ filter: 'refgeocommune-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoProvince[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoProvince[]) => {
          if (!refGeoCommune.province || !refGeoCommune.province.id) {
            this.provinces = resBody;
          } else {
            this.refGeoProvinceService
              .find(refGeoCommune.province.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoProvince>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoProvince[]) => (this.provinces = concatRes));
          }
        });

      this.refGeoTypeCommuneService
        .query({ filter: 'refgeocommune-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoTypeCommune[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoTypeCommune[]) => {
          if (!refGeoCommune.typecommune || !refGeoCommune.typecommune.id) {
            this.typecommunes = resBody;
          } else {
            this.refGeoTypeCommuneService
              .find(refGeoCommune.typecommune.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoTypeCommune>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoTypeCommune[]) => (this.typecommunes = concatRes));
          }
        });
    });
  }

  updateForm(refGeoCommune: IRefGeoCommune): void {
    this.editForm.patchValue({
      id: refGeoCommune.id,
      communeName: refGeoCommune.communeName,
      province: refGeoCommune.province,
      typecommune: refGeoCommune.typecommune,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoCommune = this.createFromForm();
    if (refGeoCommune.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoCommuneService.update(refGeoCommune));
    } else {
      this.subscribeToSaveResponse(this.refGeoCommuneService.create(refGeoCommune));
    }
  }

  private createFromForm(): IRefGeoCommune {
    return {
      ...new RefGeoCommune(),
      id: this.editForm.get(['id'])!.value,
      communeName: this.editForm.get(['communeName'])!.value,
      province: this.editForm.get(['province'])!.value,
      typecommune: this.editForm.get(['typecommune'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoCommune>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
