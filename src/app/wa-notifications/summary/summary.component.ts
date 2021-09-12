import { Component } from '@angular/core';
import { AllAppointments, MainParams } from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get whatsAppTemplates() {
    return this.dentalinkQuerysService.whatsAppTemplates;
  }
  get allAppointments() {
    return this.dentalinkQuerysService.allAppointments;
  }

  // templatesWithDataExamples: string[] = []

  showTemplateWithData(mainParams: MainParams, allAppointments: AllAppointments){
    for (let i = 0; i < 10; i++) {
      console.log(mainParams.selectedTemplate);
        for (const name in this.whatsAppTemplates) {
          if (Object.prototype.hasOwnProperty.call(this.whatsAppTemplates, name)) {
            console.log(this.whatsAppTemplates[name].template);
            
            
          }
        }
    }
  }
  
}

