import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidotSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [SidotSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class SidotHomeModule {}
