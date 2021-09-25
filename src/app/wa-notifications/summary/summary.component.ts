import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AllAppointments,
  Appointment,
  BroadcastResponse,
  MainParams,
} from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';
import { WhatsAppQuerysService } from 'src/app/services/whats-app-querys.service';
import { Appointments } from '../../interfaces/interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(
    private dentalinkQuerysService: DentalinkQuerysService,
    private whatsAppQuerysService: WhatsAppQuerysService,
    private http: HttpClient
  ) {}

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
  get getBodyParams() {
    return this.whatsAppQuerysService.getBodyParams;
  }
  get secretKeys() {
    return this.whatsAppQuerysService.secretKeys;
  }
 

  putDataIntoTemplate(appointment: Appointment): string {
    let arrayOfTemplate: string[] | string =
      this.mainParams.selectedTemplateTemplate;

    // Convierto el template en un array con split y le incrusto los valores con splice y kinto todo en un string con join
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

    arrayOfTemplate = arrayOfTemplate.join('');

    return arrayOfTemplate;
  }

  showTemplateWithData() {
    //Busca entre todos los templates de whatsapp, cual coincide con el selectedTemplateName para extraer el template en string y meterlo en selectedTemplateTemplate
    this.whatsAppTemplates.forEach((value) => {
      if (value.name === this.mainParams.selectedTemplateName) {
        this.mainParams.selectedTemplateTemplate = value.template;
      }
    });

    console.log('this.allAppointments', this.allAppointments);
    //ojo. Descomentar la siguiente linea si voy a usar datos reales
    // this.allAppointments.appointments.shift(); //Elimino el primer valor genérico
    this.allAppointments.appointments.forEach((element) => {
      const templateWithData: string = this.putDataIntoTemplate(element);
      this.templatesWithData.push(templateWithData);
      this.getBroadcastResponse(element);
    });

    //console.log('templatesWithData', this.templatesWithData);
  }

  getBroadcastResponse(appointment: Appointment){
    this.sendBroadcast(appointment).subscribe((response) => {
      console.log(response);
    });
  }

  // sendBroadcast(appointment: Appointment) {
  sendBroadcast(appointment: Appointment) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.secretKeys.b2ChatPass}`);
    const body = JSON.stringify(this.getBodyParams(appointment))
    console.log('body', body);
    
    return this.http.post<BroadcastResponse>(
      'https://api.b2chat.io/broadcast',
      { headers, body }
    );
  }

  sendWhatsAppBroadcast() {
    this.whatsAppQuerysService.sendWhatsAppBroadcast().subscribe((response) => {
      // this.whatsAppQuerysService.whatsAppToken = response;
      console.log('response sendWhatsAppBroadcast', response);
    });
  }
}
