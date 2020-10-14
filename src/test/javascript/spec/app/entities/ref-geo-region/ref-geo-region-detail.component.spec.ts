import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SidotTestModule } from '../../../test.module';
import { RefGeoRegionDetailComponent } from 'app/entities/ref-geo-region/ref-geo-region-detail.component';
import { RefGeoRegion } from 'app/shared/model/ref-geo-region.model';

describe('Component Tests', () => {
  describe('RefGeoRegion Management Detail Component', () => {
    let comp: RefGeoRegionDetailComponent;
    let fixture: ComponentFixture<RefGeoRegionDetailComponent>;
    const route = ({ data: of({ refGeoRegion: new RefGeoRegion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SidotTestModule],
        declarations: [RefGeoRegionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RefGeoRegionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RefGeoRegionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load refGeoRegion on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.refGeoRegion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
