import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  Appointment,
  BroadcastData,
  BroadcastResponse,
} from 'src/app/interfaces/interface';
import { DentalinkQuerysService } from 'src/app/services/dentalink-querys.service';
import { WhatsAppQuerysService } from 'src/app/services/whats-app-querys.service';

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
  get getBodyParams() {
    return this.whatsAppQuerysService.getBodyParams;
  }
  get secretKeys() {
    return this.whatsAppQuerysService.secretKeys;
  }

  templatesWithData: string[] = [];

  putDataIntoTemplate(appointment: Appointment): string {
    let arrayOfTemplate: string[] | string =
      this.mainParams.selectedTemplateTemplate;

    // Convierto el template en un array con split y le incrusto los valores con splice y junto todo en un string con join
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
    this.allAppointments.appointments.shift(); //Elimino el primer valor genérico
    this.allAppointments.appointments.forEach((element) => {
      const templateWithData: string = this.putDataIntoTemplate(element);
      this.templatesWithData.push(templateWithData);
    });

    this.getWANumbers();
  }

  // sendBroadcast(appointment: Appointment) {
  sendBroadcast(appointment: Appointment) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.secretKeys.b2ChatToken}`);
    const body = JSON.stringify(this.getBodyParams(appointment));
    console.log('body', body);

    return this.http.post<BroadcastResponse>(
      'https://api.b2chat.io/broadcast',
      { headers, body }
    );
  }

  sendWhatsAppBroadcast() {
    this.allAppointments.appointments.forEach((appointment) => {
      const body: BroadcastData = {
        from: `+${this.mainParams.selectedLine}`,
        to: '+573192161411', //este todavía no lo tengo
        contact_name: appointment.nombre_paciente,
        template_name: this.mainParams.selectedTemplateName,
        campaign_name: this.mainParams.campaignNote,
        values: [
          appointment.nombre_paciente,
          appointment.nombre_sucursal,
          appointment.fecha,
          appointment.hora_inicio,
          appointment.nombre_dentista,
        ],
      };
      this.whatsAppQuerysService
        .sendWhatsAppBroadcast(body)
        .subscribe((response) => {
          // this.whatsAppQuerysService.whatsAppToken = response;
          console.log('response sendWhatsAppBroadcast', response);
        });
    });
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getWANumbers() {
    console.log(this.allAppointments.appointments);

    for (let i = 0; i < this.allAppointments.appointments.length; i++) {
      console.log('Contando', i);
      await this.sleep(3000);
      
      this.dentalinkQuerysService
        .getWANumbers(this.allAppointments.appointments[i].id_paciente!)
        .subscribe(async (response) => {
          this.allAppointments.appointments[i].whatsApp = response.data.celular;
          console.log(
            `WhatsApp: ${this.allAppointments.appointments[i].whatsApp}, Id: ${this.allAppointments.appointments[i].id_paciente}`
          );
        });
    }
  }

  // getWANumbers() {
  //   console.log(this.allAppointments.appointments);
  //   this.allAppointments.appointments.forEach((appointment) => {
  //     this.dentalinkQuerysService
  //       .getWANumbers(appointment.id_paciente!)
  //       .subscribe((response) => {
  //         appointment.whatsApp = response.data.celular;
  //         console.log(
  //           `WhatsApp: ${appointment.whatsApp}, Id: ${appointment.id_paciente}`
  //         );
  //       });
  //   });
  // }
}
