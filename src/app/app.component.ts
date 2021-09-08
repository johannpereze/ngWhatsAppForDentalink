import { Component } from '@angular/core';
import { Clinics, DentalinkClinics } from './interfaces/interface';
import { DentalinkQuerysService } from './services/dentalink-querys.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService) {}

  //Todos los getters del servicio para traer la data
  get secretKeys() {
    return this.dentalinkQuerysService.secretKeys;
  }
  get whatsAppLines() {
    return this.dentalinkQuerysService.whatsAppLines;
  }
  get mainParams() {
    return this.dentalinkQuerysService.mainParams;
  }
  get saveKeys() {
    return this.dentalinkQuerysService.saveKeys;
  }
  get whatsAppTemplates() {
    return this.dentalinkQuerysService.whatsAppTemplates;
  }
  // get clinics() {
  //   return this.dentalinkQuerysService.clinics;
  // }

  selectLine() {
    console.log(this.mainParams.selectedLine);
    console.log(this.mainParams.campaignNote);
  }
  selectTemplate() {
    console.log(this.mainParams.selectedTemplate);
    this.getClinics();
  }

  apiResponseData: DentalinkClinics = {
    links: '',
    data: [],
  }; //Todo esto debería estar correctamente tipado

  getClinics() {
    this.dentalinkQuerysService.getClinics().subscribe((response) => {
      this.apiResponseData = response;
      console.log(this.apiResponseData);
    });
  }
}
