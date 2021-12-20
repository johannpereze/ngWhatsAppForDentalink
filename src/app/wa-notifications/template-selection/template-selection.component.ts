import { Component } from '@angular/core';
import { Appointments } from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';

@Component({
  selector: 'app-template-selection',
  templateUrl: './template-selection.component.html',
  styleUrls: ['./template-selection.component.scss'],
})
export class TemplateSelectionComponent {
  constructor(private dentalinkQuerysService: DentalinkQuerysService, private globalVariablesService: GlobalVariablesService) {}

  get mainParams() {
    return this.globalVariablesService.mainParams;
  }

  get whatsAppTemplates() {
    return this.globalVariablesService.whatsAppTemplates;
  }

  get allAppointments() {
    return this.globalVariablesService.allAppointments;
  }

  get validAppointmentIds() {
    return this.globalVariablesService.validAppointmentIds;
  }
  
  get componentVisibility() {
    return this.globalVariablesService.componentVisibility;
  }

  selectTemplate() {
    console.log(this.globalVariablesService.mainParams.selectedTemplateName);
    if (this.globalVariablesService.mainParams.selectedTemplateName !== '') {
      this.getAppointments();
      this.componentVisibility.templateSelection = false;
      this.componentVisibility.summary = true;
    } else {
      alert('Debes elegir una plantilla para continuar');
    }
  }

  getAppointments() {
    console.log(
      'this.globalVariablesService.mainParams.appointmentsDate',
      this.globalVariablesService.mainParams.appointmentsDate
    );
    let appointmentsUrl: string = `https://api.dentalink.healthatom.com/api/v1/citas?q={"fecha":{"eq":"${this.globalVariablesService.mainParams.appointmentsDate}"}}`;

    console.log('this.appointmentsUrl', appointmentsUrl);
    this.dentalinkQuerysService.getAppointments(appointmentsUrl).subscribe(
      (response: Appointments[]) => {
        this.globalVariablesService.loadButtonDisabled = false;
        this.globalVariablesService.loadButtonText = 'Cargar plantillas';
        this.globalVariablesService.componentVisibility.progressBarIndeterminatedShow =
          false;
        this.globalVariablesService.componentVisibility.progressBarLabel =
          'Citas descargadas';
      }
      //   (response: Appointments[]) => {
      //   console.log(
      //     'Aquí deben estar todas las citas que necesito: ',
      //     this.globalVariablesService.allAppointments.appointments
      //   );
      // } //TODO: ME FALTA APLANAR ESTA RESPUESTA PORQUE ESTÁN VOLVIENDO MUCHAS RESPUESTAS Y SÓLO NECESITO UNA
    );
  }
}
