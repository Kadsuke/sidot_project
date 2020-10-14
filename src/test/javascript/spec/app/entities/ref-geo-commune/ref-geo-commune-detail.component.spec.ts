import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoCommuneDetailComponent } from 'app/entities/ref-geo-commune/ref-geo-commune-detail.component';
import { RefGeoCommune } from 'app/shared/model/ref-geo-commune.model';

describe('Component Tests', () => {
  describe('RefGeoCommune Management Detail Component', () => {
    let comp: RefGeoCommuneDetailComponent;
    let fixture: ComponentFixture<RefGeoCommuneDetailComponent>;
    const route = ({ data: of({ refGeoCommune: new RefGeoCommune(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoCommuneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoCommuneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoCommuneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoCommune on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoCommune).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
