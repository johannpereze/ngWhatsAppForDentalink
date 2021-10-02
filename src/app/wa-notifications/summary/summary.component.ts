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
    private whatsAppQuerysService: WhatsAppQuerysService
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
  get secretKeys() {
    return this.whatsAppQuerysService.secretKeys;
  }
  get componentVisibility() {
    return this.dentalinkQuerysService.componentVisibility;
  }

  templatesWithData: string[] = [];

  sendButtonDisabled = true;
  loadButtonText = 'Cargar Mensajes';
  loadButtonDisabled = false;
  progressBar = {
    downloadedAppointments: 0,
  };

  putDataIntoTemplate(appointment: Appointment): string {
    let arrayOfTemplate: string[] | string =
      this.mainParams.selectedTemplateTemplate;

    //console.log('arrayOfTemplate sin split', arrayOfTemplate); //Depronto me sirve este log si voy a agregar más plantillas, para asegurarme que estoy haciendo bien el split

    // Convierto el template en un array con split y le incrusto los valores con splice y junto todo en un string con join
    arrayOfTemplate = arrayOfTemplate.split("'");

    const var1 = appointment.nombre_paciente;
    const var2 = appointment.nombre_sucursal;
    const var3 = appointment.fecha.split('-').reverse().join('/'); //Organizamos la fecha a yn formato local
    const var4 = appointment.hora_inicio;
    const var5 = appointment.nombre_dentista;
    const var6 = appointment.whatsApp;

    console.log(
      'arrayOfTemplate antes de ponerle valores reales: ',
      arrayOfTemplate
    );

    arrayOfTemplate.splice(1, 1, var1);
    arrayOfTemplate.splice(3, 1, var2);
    arrayOfTemplate.splice(5, 1, var3);
    arrayOfTemplate.splice(7, 1, var4);
    arrayOfTemplate.splice(9, 1, var5);
    arrayOfTemplate.splice(11, 1, var6!);

    console.log(
      'arrayOfTemplate despues de ponerle valores reales: ',
      arrayOfTemplate
    );

    arrayOfTemplate = arrayOfTemplate.join('');

    return arrayOfTemplate;
  }

  async showTemplateWithData() {
    this.loadButtonText = 'Cargando mensajes...';
    this.loadButtonDisabled = true;
    this.componentVisibility.progressBar = true;

    //Busca entre todos los templates de whatsapp, cual coincide con el selectedTemplateName para extraer el template en string y meterlo en selectedTemplateTemplate
    this.whatsAppTemplates.forEach((value) => {
      if (value.name === this.mainParams.selectedTemplateName) {
        this.mainParams.selectedTemplateTemplate = value.template;
      }
    });

    //ojo. Descomentar la siguiente linea se shift si voy a usar datos reales
    this.allAppointments.appointments.shift(); //Elimino el primer valor genérico

    //Antes de mostrar en pantalla descargamos los whatsapps
    await this.getWANumbers();

    console.log('this.allAppointments', this.allAppointments);

    this.allAppointments.appointments.forEach((element) => {
      const templateWithData: string = this.putDataIntoTemplate(element);
      this.templatesWithData.push(templateWithData);
    });
    this.sendButtonDisabled = false;
    this.loadButtonText = 'Cargados';
  }

  sendWhatsAppBroadcast() {
    this.allAppointments.appointments.forEach((appointment, i) => {
      setTimeout(() => {
        const body: BroadcastData = {
          from: `+${this.mainParams.selectedLine}`,
          to: `+57${appointment.whatsApp}`,
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
            console.log('response sendWhatsAppBroadcast', response);
          });
      }, 200 * (i + 1)); //Mandamos 5 por segundo para no sobrecargar el servidor de whatsapp y ser baneados
    });
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getWANumbers() {
    console.log(this.allAppointments.appointments);

    for (let i = 0; i < this.allAppointments.appointments.length; i++) {
      console.log('Descargando el whatsapp #', i);
      this.progressBar.downloadedAppointments = i + 1;

      this.dentalinkQuerysService
        .getWANumbers(this.allAppointments.appointments[i].id_paciente!)
        .subscribe((response) => {
          this.allAppointments.appointments[i].whatsApp = this.parseWANumber(
            response.data.celular
          );

          console.log(
            `WhatsApp: ${this.allAppointments.appointments[i].whatsApp}, Id: ${this.allAppointments.appointments[i].id_paciente}`
          );
        });
      await this.sleep(5000);
    }
  }

  parseWANumber(cellphone: string) {
    //Por aquí debería retornar un array con los whatsapp que no cumplan el formato de 10 numeros para ver cuales son y qué hacer con ellos. Por lo menos imprimirlos en pantalla
    return cellphone.replace(/\D+/g, '').slice(0, 10);
  }
}
