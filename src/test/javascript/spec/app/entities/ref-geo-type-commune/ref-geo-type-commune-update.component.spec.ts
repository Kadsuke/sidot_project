import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoTypeCommuneUpdateComponent } from 'app/entities/ref-geo-type-commune/ref-geo-type-commune-update.component';
import { RefGeoTypeCommuneService } from 'app/entities/ref-geo-type-commune/ref-geo-type-commune.service';
import { RefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';

describe('Component Tests', () => {
  describe('RefGeoTypeCommune Management Update Component', () => {
    let comp: RefGeoTypeCommuneUpdateComponent;
    let fixture: ComponentFixture<RefGeoTypeCommuneUpdateComponent>;
    let service: RefGeoTypeCommuneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoTypeCommuneUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoTypeCommuneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoTypeCommuneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoTypeCommuneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoTypeCommune(123);
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
        const entity = new RefGeoTypeCommune();
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
