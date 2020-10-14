import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoLotUpdateComponent } from 'app/entities/ref-geo-lot/ref-geo-lot-update.component';
import { RefGeoLotService } from 'app/entities/ref-geo-lot/ref-geo-lot.service';
import { RefGeoLot } from 'app/shared/model/ref-geo-lot.model';

describe('Component Tests', () => {
  describe('RefGeoLot Management Update Component', () => {
    let comp: RefGeoLotUpdateComponent;
    let fixture: ComponentFixture<RefGeoLotUpdateComponent>;
    let service: RefGeoLotService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoLotUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RefGeoLotUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RefGeoLotUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RefGeoLotService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RefGeoLot(123);
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
        const entity = new RefGeoLot();
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
