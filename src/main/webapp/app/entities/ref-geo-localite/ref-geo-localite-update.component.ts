import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoLocalite, RefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';
import { RefGeoLocaliteService } from './ref-geo-localite.service';
import { IRefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';
import { RefGeoSecteurService } from 'app/entities/ref-geo-secteur/ref-geo-secteur.service';

@Component({
  selector: 'jhi-ref-geo-localite-update',
  templateUrl: './ref-geo-localite-update.component.html',
})
export class RefGeoLocaliteUpdateComponent implements OnInit {
  isSaving = false;
  secteurs: IRefGeoSecteur[] = [];

  editForm = this.fb.group({
    id: [],
    localiteName: [],
    secteur: [],
  });

  constructor(
    protected refGeoLocaliteService: RefGeoLocaliteService,
    protected refGeoSecteurService: RefGeoSecteurService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoLocalite }) => {
      this.updateForm(refGeoLocalite);

      this.refGeoSecteurService
        .query({ filter: 'refgeolocalite-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoSecteur[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoSecteur[]) => {
          if (!refGeoLocalite.secteur || !refGeoLocalite.secteur.id) {
            this.secteurs = resBody;
          } else {
            this.refGeoSecteurService
              .find(refGeoLocalite.secteur.id)
              .pipe(
                map((subRes: HttpResponse<IRefGeoSecteur>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRefGeoSecteur[]) => (this.secteurs = concatRes));
          }
        });
    });
  }

  updateForm(refGeoLocalite: IRefGeoLocalite): void {
    this.editForm.patchValue({
      id: refGeoLocalite.id,
      localiteName: refGeoLocalite.localiteName,
      secteur: refGeoLocalite.secteur,
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
      secteur: this.editForm.get(['secteur'])!.value,
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

  trackById(index: number, item: IRefGeoSecteur): any {
    return item.id;
  }
}
