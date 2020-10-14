import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoLocalite, RefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';
import { RefGeoLocaliteService } from './ref-geo-localite.service';
import { IRefGeoCommune } from 'app/shared/model/ref-geo-commune.model';
import { RefGeoCommuneService } from 'app/entities/ref-geo-commune/ref-geo-commune.service';

@Component({
  selector: 'jhi-ref-geo-localite-update',
  templateUrl: './ref-geo-localite-update.component.html',
})
export class RefGeoLocaliteUpdateComponent implements OnInit {
  isSaving = false;
  communes: IRefGeoCommune[] = [];

  editForm = this.fb.group({
    id: [],
    localiteName: [],
    commune: [],
  });

  constructor(
    protected refGeoLocaliteService: RefGeoLocaliteService,
    protected refGeoCommuneService: RefGeoCommuneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoLocalite }) => {
      this.updateForm(refGeoLocalite);

      this.refGeoCommuneService
        .query({ filter: 'refgeolocalite-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoCommune[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoCommune[]) => {
          if (!refGeoLocalite.commune || !refGeoLocalite.commune.id) {
            this.communes = resBody;
          } else {
            this.refGeoCommuneService
              .find(refGeoLocalite.commune.id)
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

  updateForm(refGeoLocalite: IRefGeoLocalite): void {
    this.editForm.patchValue({
      id: refGeoLocalite.id,
      localiteName: refGeoLocalite.localiteName,
      commune: refGeoLocalite.commune,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoLocalite = this.createFromForm();
    if (refGeoLocalite.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoLocaliteService.update(refGeoLocalite));
    } else {
      this.subscribeToSaveResponse(this.refGeoLocaliteService.create(refGeoLocalite));
    }
  }

  private createFromForm(): IRefGeoLocalite {
    return {
      ...new RefGeoLocalite(),
      id: this.editForm.get(['id'])!.value,
      localiteName: this.editForm.get(['localiteName'])!.value,
      commune: this.editForm.get(['commune'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoLocalite>>): void {
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
