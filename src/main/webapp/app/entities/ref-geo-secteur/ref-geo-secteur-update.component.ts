import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRefGeoSecteur, RefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';
import { RefGeoSecteurService } from './ref-geo-secteur.service';
import { IRefGeoLocalite } from 'app/shared/model/ref-geo-localite.model';
import { RefGeoLocaliteService } from 'app/entities/ref-geo-localite/ref-geo-localite.service';

@Component({
  selector: 'jhi-ref-geo-secteur-update',
  templateUrl: './ref-geo-secteur-update.component.html',
})
export class RefGeoSecteurUpdateComponent implements OnInit {
  isSaving = false;
  localites: IRefGeoLocalite[] = [];

  editForm = this.fb.group({
    id: [],
    secteurName: [],
    localite: [],
  });

  constructor(
    protected refGeoSecteurService: RefGeoSecteurService,
    protected refGeoLocaliteService: RefGeoLocaliteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ refGeoSecteur }) => {
      this.updateForm(refGeoSecteur);

      this.refGeoLocaliteService
        .query({ filter: 'refgeosecteur-is-null' })
        .pipe(
          map((res: HttpResponse<IRefGeoLocalite[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRefGeoLocalite[]) => {
          if (!refGeoSecteur.localite || !refGeoSecteur.localite.id) {
            this.localites = resBody;
          } else {
            this.refGeoLocaliteService
              .find(refGeoSecteur.localite.id)
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

  updateForm(refGeoSecteur: IRefGeoSecteur): void {
    this.editForm.patchValue({
      id: refGeoSecteur.id,
      secteurName: refGeoSecteur.secteurName,
      localite: refGeoSecteur.localite,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const refGeoSecteur = this.createFromForm();
    if (refGeoSecteur.id !== undefined) {
      this.subscribeToSaveResponse(this.refGeoSecteurService.update(refGeoSecteur));
    } else {
      this.subscribeToSaveResponse(this.refGeoSecteurService.create(refGeoSecteur));
    }
  }

  private createFromForm(): IRefGeoSecteur {
    return {
      ...new RefGeoSecteur(),
      id: this.editForm.get(['id'])!.value,
      secteurName: this.editForm.get(['secteurName'])!.value,
      localite: this.editForm.get(['localite'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRefGeoSecteur>>): void {
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
