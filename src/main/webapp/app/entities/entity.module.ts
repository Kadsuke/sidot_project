import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ref-geo-region',
        loadChildren: () => import('./ref-geo-region/ref-geo-region.module').then(m => m.SidotRefGeoRegionModule),
      },
      {
        path: 'ref-geo-province',
        loadChildren: () => import('./ref-geo-province/ref-geo-province.module').then(m => m.SidotRefGeoProvinceModule),
      },
      {
        path: 'ref-geo-commune',
        loadChildren: () => import('./ref-geo-commune/ref-geo-commune.module').then(m => m.SidotRefGeoCommuneModule),
      },
      {
        path: 'ref-geo-type-commune',
        loadChildren: () => import('./ref-geo-type-commune/ref-geo-type-commune.module').then(m => m.SidotRefGeoTypeCommuneModule),
      },
      {
        path: 'ref-geo-localite',
        loadChildren: () => import('./ref-geo-localite/ref-geo-localite.module').then(m => m.SidotRefGeoLocaliteModule),
      },
      {
        path: 'ref-geo-secteur',
        loadChildren: () => import('./ref-geo-secteur/ref-geo-secteur.module').then(m => m.SidotRefGeoSecteurModule),
      },
      {
        path: 'ref-geo-section',
        loadChildren: () => import('./ref-geo-section/ref-geo-section.module').then(m => m.SidotRefGeoSectionModule),
      },
      {
        path: 'ref-geo-lot',
        loadChildren: () => import('./ref-geo-lot/ref-geo-lot.module').then(m => m.SidotRefGeoLotModule),
      },
      {
        path: 'ref-geo-parcelle',
        loadChildren: () => import('./ref-geo-parcelle/ref-geo-parcelle.module').then(m => m.SidotRefGeoParcelleModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SidotEntityModule {}
