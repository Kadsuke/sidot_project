import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoParcelleUpdateComponent } from 'app/entities/ref-geo-parcelle/ref-geo-parcelle-update.component';
import { RefGeoParcelleService } from 'app/entities/ref-geo-parcelle/ref-geo-parcelle.service';
import { RefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';

describe('Component Tests', () => {
  describe('RefGeoParcelle Management Update Component', () => {
    let comp: RefGeoParcelleUpdateComponent;
    let fixture: ComponentFixture<RefGeoParcelleUpdateComponent>;
    let service: RefGeoParcelleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoParcelleUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoParcelleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoParcelleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoParcelleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoParcelle(123);
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
        const entity = new RefGeoParcelle();
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
