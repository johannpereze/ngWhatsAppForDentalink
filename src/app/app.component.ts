import { Component, EventEmitter } from '@angular/core';
import {
  Clinics,
  DentalinkAppointments,
  DentalinkClinics,
} from './interfaces/interface';
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
    this.getAppointments();
  }

  saveClinics(event: any) {
    //No se como tipar este SumbitEvent

    for (let i = 0; i < this.clinicsApiResponse.data.length; i++) {
      // console.log(event.srcElement[i].name);
      // console.log(event.srcElement[i].checked);

      if (event.srcElement[i].checked) {
        this.mainParams.selectedClinics.push(event.srcElement[i].name);
      }
    }

    console.log(this.mainParams.appointmentsDate);

    console.log(this.mainParams.selectedClinics);

    console.log(this.mainParams);
  }

  clinicsApiResponse: DentalinkClinics = {
    links: '',
    data: [],
  };
  appointmentsApiResponse: DentalinkAppointments = {
    links: {
      current: '',
      next: '',
    },
    data: [],
  };

  //Todo esto debería estar correctamente tipado

  getClinics() {
    this.dentalinkQuerysService.getClinics().subscribe((response) => {
      this.clinicsApiResponse = response;
      console.log(this.clinicsApiResponse);
    });
  }

  getAppointments() {
    this.dentalinkQuerysService.getAppointments().subscribe((response) => {
      console.log('Linea 89', response);
      this.dentalinkQuerysService
        .getNextPage(response.links.next)
        .subscribe((response) => {
          console.log('Linea 92', response);
        });
    });
  }

  // }
  // this.getNextPage
  // elsereturn

  // console.log(this.appointmentsApiResponse);
  //   this.dentalinkQuerysService.getNextPage(response.links.next).subscribe((response) => {

  // }
  // if(!response.links.next) return
  // else{

  // this.appointmentsApiResponse = response;
  //Tengo que hacer un callback que vaya trayendo todas las citas
  // console.log(this.appointmentsApiResponse);

  getNextPage(response:DentalinkAppointments) {
    this.dentalinkQuerysService.getNextPage(response.links.next).subscribe((response) => {
      console.log('linea 114', response);
      this.getNextPage(response)
    });
  }
}
