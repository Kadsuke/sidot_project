import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoParcelleDetailComponent } from 'app/entities/ref-geo-parcelle/ref-geo-parcelle-detail.component';
import { RefGeoParcelle } from 'app/shared/model/ref-geo-parcelle.model';

describe('Component Tests', () => {
  describe('RefGeoParcelle Management Detail Component', () => {
    let comp: RefGeoParcelleDetailComponent;
    let fixture: ComponentFixture<RefGeoParcelleDetailComponent>;
    const route = ({ data: of({ refGeoParcelle: new RefGeoParcelle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoParcelleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoParcelleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoParcelleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoParcelle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoParcelle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
