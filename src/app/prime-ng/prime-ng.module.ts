import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  declarations: [],
  exports: [
    InputTextModule,
    ButtonModule,
    CardModule,
    DropdownModule

  ]
})
export class PrimeNgModule { }
