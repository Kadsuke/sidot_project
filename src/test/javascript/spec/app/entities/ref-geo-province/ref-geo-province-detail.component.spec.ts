import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoProvinceDetailComponent } from 'app/entities/ref-geo-province/ref-geo-province-detail.component';
import { RefGeoProvince } from 'app/shared/model/ref-geo-province.model';

describe('Component Tests', () => {
  describe('RefGeoProvince Management Detail Component', () => {
    let comp: RefGeoProvinceDetailComponent;
    let fixture: ComponentFixture<RefGeoProvinceDetailComponent>;
    const route = ({ data: of({ refGeoProvince: new RefGeoProvince(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoProvinceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoProvinceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoProvinceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoProvince on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoProvince).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
