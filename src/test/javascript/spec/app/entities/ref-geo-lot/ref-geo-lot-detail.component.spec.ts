import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoLotDetailComponent } from 'app/entities/ref-geo-lot/ref-geo-lot-detail.component';
import { RefGeoLot } from 'app/shared/model/ref-geo-lot.model';

describe('Component Tests', () => {
  describe('RefGeoLot Management Detail Component', () => {
    let comp: RefGeoLotDetailComponent;
    let fixture: ComponentFixture<RefGeoLotDetailComponent>;
    const route = ({ data: of({ refGeoLot: new RefGeoLot(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoLotDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoLotDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoLotDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoLot on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoLot).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
