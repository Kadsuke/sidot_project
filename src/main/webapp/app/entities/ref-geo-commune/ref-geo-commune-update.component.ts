import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoCommune, RefGeoCommune } from 'app/shared/model/ref-geo-commune.model';
import { RefGeoCommuneService } from './ref-geo-commune.service';
import { IRefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';
import { RefGeoLocaliteService } from 'app/entities/ref-geo-localite/ref-geo-localite.service';

@Component({
  selector: 'jhi-ref-geo-commune-update',
  templateUrl: './ref-geo-commune-update.component.html',
})
export class RefGeoCommuneUpdateComponent implements OnInit {
  isSaving = false;
  localites: IRefGeoLocalite[] = [];

  editForm = this.fb.group({
    id: [],
    communeName: [],
    localite: [],
  });

  constructor(
    protected refGeoCommuneService: RefGeoCommuneService,
    protected refGeoLocaliteService: RefGeoLocaliteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoCommune }) => {
      this.updateForm(refGeoCommune);

      this.refGeoLocaliteService
        .query({ filter: 'refgeocommune-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoLocalite[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoLocalite[]) => {
          if (!refGeoCommune.localite || !refGeoCommune.localite.id) {
            this.localites = resBody;
          } else {
            this.refGeoLocaliteService
              .find(refGeoCommune.localite.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoLocalite>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoLocalite[]) => (this.localites = concatRes));
          }
        });
    });
  }

  updateForm(refGeoCommune: IRefGeoCommune): void {
    this.editForm.patchValue({
      id: refGeoCommune.id,
      communeName: refGeoCommune.communeName,
      localite: refGeoCommune.localite,
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
      localite: this.editForm.get(['localite'])!.value,
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

  trackById(index: number, item: IRefGeoLocalite): any {
    return item.id;
  }
}
