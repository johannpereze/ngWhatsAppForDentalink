import { Component } from '@angular/core';
import {
  AllAppointments,
  Appointment,
  MainParams,
} from 'src/app/interfaces/interface';
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
  get templatesWithData() {
    return this.dentalinkQuerysService.templatesWithData;
  }

  putDataIntoTemplate(appointment: Appointment): string {
    let arrayOfTemplate: string[] | string =
      this.mainParams.selectedTemplateTemplate;

    // Convierto el template en un array con split y le incrusto los valores con splice
    arrayOfTemplate = arrayOfTemplate.split("'");
    const var1 = appointment.nombre_paciente;
    const var2 = appointment.nombre_sucursal;
    const var3 = appointment.fecha;
    const var4 = appointment.hora_inicio;
    const var5 = appointment.nombre_dentista;

    arrayOfTemplate.splice(1, 1, var1);
    arrayOfTemplate.splice(3, 1, var2);
    arrayOfTemplate.splice(5, 1, var3);
    arrayOfTemplate.splice(7, 1, var4);
    arrayOfTemplate.splice(9, 1, var5);
    // console.log('Aqui debería ir con el nombre', arrayOfTemplate);

    arrayOfTemplate = arrayOfTemplate.join('');

    return arrayOfTemplate;
  }

  showTemplateWithData() {
    //busque la propiedad template en el objeto con name coincidente con selectedTemplateName

    this.whatsAppTemplates.forEach((value) => {
      if (value.name === this.mainParams.selectedTemplateName) {
        this.mainParams.selectedTemplateTemplate = value.template;
      }
    });

    console.log(this.allAppointments);

    this.allAppointments.appointments.forEach((element) => {
      const templateWithData: string = this.putDataIntoTemplate(element);
      this.templatesWithData.push(templateWithData);
    });

    console.log('templatesWithData', this.templatesWithData);
  }
}
