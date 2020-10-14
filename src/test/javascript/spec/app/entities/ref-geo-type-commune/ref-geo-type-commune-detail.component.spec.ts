import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoTypeCommuneDetailComponent } from 'app/entities/ref-geo-type-commune/ref-geo-type-commune-detail.component';
import { RefGeoTypeCommune } from 'app/shared/model/ref-geo-type-commune.model';

describe('Component Tests', () => {
  describe('RefGeoTypeCommune Management Detail Component', () => {
    let comp: RefGeoTypeCommuneDetailComponent;
    let fixture: ComponentFixture<RefGeoTypeCommuneDetailComponent>;
    const route = ({ data: of({ refGeoTypeCommune: new RefGeoTypeCommune(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoTypeCommuneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoTypeCommuneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoTypeCommuneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoTypeCommune on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoTypeCommune).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
