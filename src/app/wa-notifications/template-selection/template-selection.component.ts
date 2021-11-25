import { Component } from '@angular/core';
import { Appointments } from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';

@Component({
  selector: 'app-template-selection',
  templateUrl: './template-selection.component.html',
  styleUrls: ['./template-selection.component.scss'],
})
export class TemplateSelectionComponent {
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

  get validAppointmentIds() {
    return this.dentalinkQuerysService.validAppointmentIds;
  }
  
  get componentVisibility() {
    return this.dentalinkQuerysService.componentVisibility;
  }

  selectTemplate() {
    console.log(this.mainParams.selectedTemplateName);
    if (this.mainParams.selectedTemplateName !== '') {
      this.getAppointments();
      this.componentVisibility.templateSelection = false;
      this.componentVisibility.summary = true;
    } else {
      alert('Debes elegir una plantilla para continuar');
    }
  }

  getAppointments() {
    console.log(
      'this.mainParams.appointmentsDate',
      this.mainParams.appointmentsDate
    );
    let appointmentsUrl: string = `https://api.dentalink.healthatom.com/api/v1/citas?q={"fecha":{"eq":"${this.mainParams.appointmentsDate}"}}`;

    console.log('this.appointmentsUrl', appointmentsUrl);
    this.dentalinkQuerysService.getAppointments(appointmentsUrl).subscribe(
      (response: Appointments[]) => {
        this.dentalinkQuerysService.loadButtonDisabled = false;
        this.dentalinkQuerysService.loadButtonText = 'Cargar plantillas';
        this.dentalinkQuerysService.componentVisibility.progressBarIndeterminatedShow =
          false;
        this.dentalinkQuerysService.componentVisibility.progressBarLabel =
          'Citas descargadas';
      }
      //   (response: Appointments[]) => {
      //   console.log(
      //     'Aquí deben estar todas las citas que necesito: ',
      //     this.allAppointments.appointments
      //   );
      // } //TODO: ME FALTA APLANAR ESTA RESPUESTA PORQUE ESTÁN VOLVIENDO MUCHAS RESPUESTAS Y SÓLO NECESITO UNA
    );
  }
}
