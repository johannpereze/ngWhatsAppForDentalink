import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SecretKeysComponent } from './secret-keys/secret-keys.component';
import { LineSelectionComponent } from './line-selection/line-selection.component';
import { TemplateSelectionComponent } from './template-selection/template-selection.component';
// import { DateSelectionComponent } from './date-selection/date-selection.component';
import { SummaryComponent } from './summary/summary.component';
import { WaNotificationsPageComponent } from './wa-notifications-page/wa-notifications-page.component';
import { ClinicsListComponent } from './clinics-list/clinics-list.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';



@NgModule({
  declarations: [
    SecretKeysComponent,
    LineSelectionComponent,
    TemplateSelectionComponent,
    // DateSelectionComponent,
    SummaryComponent,
    WaNotificationsPageComponent,
    ClinicsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  exports:[
    WaNotificationsPageComponent
  ]
})
export class WANotificationsModule { }
