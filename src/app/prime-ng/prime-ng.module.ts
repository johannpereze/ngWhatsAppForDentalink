import { NgModule } from '@angular/core';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DropdownModule} from 'primeng/dropdown';
import {MenubarModule} from 'primeng/menubar';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [],
  exports: [
    InputTextModule,
    ButtonModule,
    CardModule,
    DropdownModule,
    MenubarModule,
    CalendarModule

  ]
})
export class PrimeNgModule { }
