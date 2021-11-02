import { Component } from '@angular/core';
import {
  Appointment,
  BroadcastData,
  TemplateWithData,
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
  get componentVisibility() {
    return this.dentalinkQuerysService.componentVisibility;
  }
  get loadButtonDisabled() {
    return this.dentalinkQuerysService.loadButtonDisabled;
  }
  get loadButtonText() {
    return this.dentalinkQuerysService.loadButtonText;
  }

  templatesWithData: TemplateWithData[] = [];

  sendButtonDisabled = true;

  progressBar = {
    downloadedAppointments: 0,
    progressBarValue: 0,
  };

  putDataIntoTemplate(appointment: Appointment): string {
    let arrayOfTemplate: string[] | string =
      this.mainParams.selectedTemplateTemplate;

    //console.log('arrayOfTemplate sin split', arrayOfTemplate); //Depronto me sirve este log si voy a agregar más plantillas, para asegurarme que estoy haciendo bien el split

    // Convierto el template en un array con split y le incrusto los valores con splice y junto todo en un string con join
    arrayOfTemplate = arrayOfTemplate.split("'");

    const var1 = appointment.nombre_paciente;
    const var2 = appointment.nombre_sucursal;
    const var3 = appointment.fecha.split('-').reverse().join('/'); //Organizamos la fecha a un formato local
    const var4 = appointment.hora_inicio;
    const var5 = appointment.nombre_dentista;
    const var6 = appointment.whatsApp;

    // console.log(
    //   'arrayOfTemplate antes de ponerle valores reales: ',
    //   arrayOfTemplate
    // ); // Activar si quiero ver los templates antes de estar completos en la consola (Es demasiado texto)

    arrayOfTemplate.splice(1, 1, var1);
    arrayOfTemplate.splice(3, 1, var2);
    arrayOfTemplate.splice(5, 1, var3);
    arrayOfTemplate.splice(7, 1, var4);
    arrayOfTemplate.splice(9, 1, var5);
    arrayOfTemplate.splice(11, 1, var6!);
    // console.log(
    //   'arrayOfTemplate despues de ponerle valores reales: ',
    //   arrayOfTemplate
    // ); // Activar si quiero ver los templates completos en la consola (Es demasiado texto)

    arrayOfTemplate = arrayOfTemplate.join('');

    return arrayOfTemplate;
  }

  async showTemplateWithData() {
    this.dentalinkQuerysService.loadButtonText = 'Descargando citas...';
    this.dentalinkQuerysService.loadButtonDisabled = true;
    this.componentVisibility.progressBarDynamicShow = true;
    this.componentVisibility.progressBarIndeterminatedShow = false;
    this.dentalinkQuerysService.componentVisibility.progressBarLabel =
      'Descargando citas';

    console.log(
      'this.allAppointments luego de cargar el progressbar:',
      this.allAppointments
    );

    //Busca entre todos los templates de whatsapp, cual coincide con el selectedTemplateName para extraer el template en string y meterlo en selectedTemplateTemplate
    this.whatsAppTemplates.forEach((value) => {
      if (value.name === this.mainParams.selectedTemplateName) {
        this.mainParams.selectedTemplateTemplate = value.template;
      }
    });

    this.allAppointments.appointments.shift(); //Elimino el primer valor genérico

    //Antes de mostrar en pantalla descargamos los whatsapps
    await this.getWANumbers();

    console.log('this.allAppointments :', this.allAppointments);

    this.allAppointments.appointments.forEach((appointment) => {
      const templateWithData: TemplateWithData = {
        template: this.putDataIntoTemplate(appointment),
        appointmentId: appointment.id!,
        sendedLabel: 'Sin enviar',
        sendedIcon: 'pi pi-info-circle',
        sendedSeverity: 'warning',
        updatedDentalinkLabel: 'Sin actualizar en dentalink',
        updatedDentalinkIcon: 'pi pi-info-circle',
        updatedDentalinkSeverity: 'warning',
      };
      this.putDataIntoTemplate(appointment);
      this.templatesWithData.push(templateWithData);
    });
    this.dentalinkQuerysService.loadButtonText = 'Citas descargadas';
  }

  sendWhatsAppBroadcast() {
    this.allAppointments.appointments.forEach((appointment, i) => {
      setTimeout(() => {
        const body: BroadcastData = {
          from: `+57${this.mainParams.selectedLine}`,
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

            const templatesWithDataIndex = this.templatesWithData.findIndex(
              (template) => template.appointmentId === appointment.id
            );

            (this.templatesWithData[templatesWithDataIndex].sendedLabel =
              'Enviado'),
              (this.templatesWithData[templatesWithDataIndex].sendedIcon =
                'pi pi-check-circle'),
              (this.templatesWithData[templatesWithDataIndex].sendedSeverity =
                'success'),
              console.log(
                `WhatsApp: ${appointment.whatsApp}, Id: ${appointment.id_paciente}`
              );
          });
      }, 200 * (i + 1)); //Mandamos 5 por segundo para no sobrecargar el servidor de whatsapp y ser baneados //El foreach es síncrono, va a ejecutar todos los settimeaout de inmediato. lo que se puede hacer es volver el argumento de espera dinámico y que en todas las repeticiones tengan un valor de espera diferente
    });
  }

  async getWANumbers() {
    //creo que no se necesita el async
    console.log(
      'Estas son las citas sin validar ',
      this.allAppointments.appointmentsWitoutValidation
    );
    console.log(
      'Estas son las citas a las cuales les vamos a buscar el WhatsApp: ',
      this.allAppointments.appointments
    );

    this.allAppointments.appointments.forEach((appointment, i) => {
      setTimeout(() => {
        console.log('Descargando el whatsapp #', i);
        this.progressBar.downloadedAppointments = i + 1;
        this.progressBar.progressBarValue = Math.ceil(
          (this.progressBar.downloadedAppointments /
            this.allAppointments.appointments.length) *
            100
        );

        this.dentalinkQuerysService
          .getWANumbers(appointment.id_paciente!)
          .subscribe((response) => {
            appointment.whatsApp = this.parseWANumber(response.data.celular);
            // const templatesWithDataIndex = this.templatesWithData.findIndex(
            //   (template) => template.appointmentId === appointment.id
            // );

            // (this.templatesWithData[templatesWithDataIndex].sendedLabel =
            //   'Enviado'),
            //   (this.templatesWithData[templatesWithDataIndex].sendedIcon =
            //     'pi pi-check-circle'),
            //   (this.templatesWithData[templatesWithDataIndex].sendedSeverity =
            //     'success'),
            console.log(
              `WhatsApp: ${appointment.whatsApp}, Id: ${appointment.id_paciente}`
            );

            if (i === this.allAppointments.appointments.length - 1) {
              this.sendButtonDisabled = false;
            }
          });
      }, 5000 * (i + 1));
    });
  }

  updateDentalinkAppointments() {
    this.allAppointments.appointments.forEach((appointment, i) => {
      setTimeout(() => {
        console.log('Actualizando cita # ', i);

        this.dentalinkQuerysService
          .updateDentalinkAppointments(appointment.id!)
          .subscribe((response) => {
            console.log(response);
            
            const templatesWithDataIndex = this.templatesWithData.findIndex(
              (template) => template.appointmentId === appointment.id
            );

            (this.templatesWithData[
              templatesWithDataIndex
            ].updatedDentalinkLabel = 'Actualizado'),
              (this.templatesWithData[
                templatesWithDataIndex
              ].updatedDentalinkIcon = 'pi pi-check-circle'),
              (this.templatesWithData[
                templatesWithDataIndex
              ].updatedDentalinkSeverity = 'success'),
              console.log(`Cita #${appointment.id} actualizada`);

            if (i === this.allAppointments.appointments.length - 1) {
              this.sendButtonDisabled = false;
            }
          });
      }, 3000 * (i + 1));
    });
  }

  parseWANumber(cellphone: string) {
    //Por aquí debería retornar un array con los whatsapp que no cumplan el formato de 10 numeros para ver cuales son y qué hacer con ellos. Por lo menos imprimirlos en pantalla
    return cellphone.replace(/\D+/g, '').slice(0, 10);
  }
}
