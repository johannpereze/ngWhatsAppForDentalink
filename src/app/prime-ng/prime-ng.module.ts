import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [],
  exports: [
    InputTextModule,
    ButtonModule,
    CardModule
  ]
})
export class PrimeNgModule { }
