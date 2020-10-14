import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoSecteurUpdateComponent } from 'app/entities/ref-geo-secteur/ref-geo-secteur-update.component';
import { RefGeoSecteurService } from 'app/entities/ref-geo-secteur/ref-geo-secteur.service';
import { RefGeoSecteur } from 'app/shared/model/ref-geo-secteur.model';

describe('Component Tests', () => {
  describe('RefGeoSecteur Management Update Component', () => {
    let comp: RefGeoSecteurUpdateComponent;
    let fixture: ComponentFixture<RefGeoSecteurUpdateComponent>;
    let service: RefGeoSecteurService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoSecteurUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoSecteurUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoSecteurUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoSecteurService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoSecteur(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoSecteur();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
