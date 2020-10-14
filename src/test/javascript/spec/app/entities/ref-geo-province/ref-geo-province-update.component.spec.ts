import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoProvinceUpdateComponent } from 'app/entities/ref-geo-province/ref-geo-province-update.component';
import { RefGeoProvinceService } from 'app/entities/ref-geo-province/ref-geo-province.service';
import { RefGeoProvince } from 'app/shared/model/ref-geo-province.model';

describe('Component Tests', () => {
  describe('RefGeoProvince Management Update Component', () => {
    let comp: RefGeoProvinceUpdateComponent;
    let fixture: ComponentFixture<RefGeoProvinceUpdateComponent>;
    let service: RefGeoProvinceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoProvinceUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoProvinceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoProvinceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoProvinceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoProvince(123);
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
        const entity = new RefGeoProvince();
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
