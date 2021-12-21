import { Component } from '@angular/core';
import {
  Appointment,
  BroadcastData,
  TemplateWithData,
} from 'src/app/interfaces/interface';
import { GlobalVariablesService } from 'src/app/services/global-variables.service';
import { WhatsAppQuerysService } from 'src/app/services/whats-app-querys.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
  constructor(
    private whatsAppQuerysService: WhatsAppQuerysService,
    private globalVariablesService: GlobalVariablesService
  ) { }

  get mainParams() {
    return this.globalVariablesService.mainParams;
  }
  get whatsAppTemplates() {
    return this.globalVariablesService.whatsAppTemplates;
  }
  get allAppointments() {
    return this.globalVariablesService.allAppointments;
  }
  get componentVisibility() {
    return this.globalVariablesService.componentVisibility;
  }
  get loadButtonDisabled() {
    return this.globalVariablesService.loadButtonDisabled;
  }
  get loadButtonText() {
    return this.globalVariablesService.loadButtonText;
  }
  get secretKeys() {
    return this.globalVariablesService.secretKeys;
  }

  templatesWithData: TemplateWithData[] = [];

  sendButtonDisabled = true;
  dentalinkUpdatedButtonDisabled = true;


  progressBar = {
    downloadedAppointments: 0,
    progressBarValue: 0,
  };

  putDataIntoTemplate(appointment: Appointment): string {
    let arrayOfTemplate: string[] | string =
      this.globalVariablesService.mainParams.selectedTemplateTemplate;

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
    this.globalVariablesService.loadButtonText = 'Descargando citas...';
    this.globalVariablesService.loadButtonDisabled = true;
    this.componentVisibility.progressBarDynamicShow = true;
    this.componentVisibility.progressBarIndeterminatedShow = false;
    this.globalVariablesService.componentVisibility.progressBarLabel =
      'Descargando citas';

    console.log(
      'this.globalVariablesService.allAppointments luego de cargar el progressbar:',
      this.globalVariablesService.allAppointments
    );

    //Busca entre todos los templates de whatsapp, cual coincide con el selectedTemplateName para extraer el template en string y meterlo en selectedTemplateTemplate
    this.whatsAppTemplates.forEach((value) => {
      if (value.name === this.globalVariablesService.mainParams.selectedTemplateName) {
        this.globalVariablesService.mainParams.selectedTemplateTemplate = value.template;
      }
    });

    this.globalVariablesService.allAppointments.appointments.shift(); //Elimino el primer valor genérico

    //Antes de mostrar en pantalla descargamos los whatsapps
    await this.getWANumbers();

    console.log('this.globalVariablesService.allAppointments :', this.globalVariablesService.allAppointments);

    this.globalVariablesService.allAppointments.appointments.forEach((appointment) => {
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
    this.globalVariablesService.loadButtonText = 'Citas descargadas';
  }

  sendWhatsAppBroadcast() {
    this.sendButtonDisabled = true;
    this.dentalinkUpdatedButtonDisabled = false;

    //Primero obtenemos el token de b2chat
    this.whatsAppQuerysService.getWhatsAppToken().subscribe((response) => {
      this.globalVariablesService.secretKeys.b2ChatToken = response.access_token;
      this.globalVariablesService.secretKeys.b2ChatExpiration = (
        response.expires_in /
        60 /
        60
      ).toFixed(2);
      console.log('Token: ', this.globalVariablesService.secretKeys.b2ChatToken); //borrar esto por seguridad. Aunque no es crítico porque es el token que se vence
      console.log(`Expira en: ${this.globalVariablesService.secretKeys.b2ChatExpiration} Horas`);

      //Luego enviamos los mensajes
      this.globalVariablesService.allAppointments.appointments.forEach((appointment, i) => {
        setTimeout(() => {
          const body: BroadcastData = {
            from: `+57${this.globalVariablesService.mainParams.selectedLine}`,
            to: `+57${appointment.whatsApp}`,
            contact_name: appointment.nombre_paciente,
            template_name: this.globalVariablesService.mainParams.selectedTemplateName,
            campaign_name: this.globalVariablesService.mainParams.campaignNote,
            values: [
              appointment.nombre_paciente,
              appointment.nombre_sucursal,
              appointment.fecha.split('-').reverse().join('/'),
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
    });
  }

  downloadWA = async (patients: any, retryLimit = 50, retryCount = 0, index = 0) => {
    const url = 'https://api.dentalink.healthatom.com/api/v1/pacientes/'
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${this.globalVariablesService.secretKeys.dentalinkKey}`);
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      // redirect: 'follow'
    };
    if (index === patients.length) {
      console.log('Finalizado');
      this.sendButtonDisabled = false;
      return
    }
    else {
      return fetch(`${url}${patients[index]}`, requestOptions)
        .then(async (res) => {
          console.log('Descargando el whatsapp #', index);
          const data = await res.json()
          console.log(data)
          if (data.data) {
            this.globalVariablesService.allAppointments.appointments[index].whatsApp = this.parseWANumber(data.data.celular);
            this.progressBar.downloadedAppointments = index + 1;
            this.progressBar.progressBarValue = Math.ceil(
              (this.progressBar.downloadedAppointments /
                this.globalVariablesService.allAppointments.appointments.length) *
              100
            );
            console.log(data.data.celular)
            setTimeout(() => {
              return this.downloadWA(patients, retryLimit, retryCount, index)
            }, 1000);
            index++
          } else {
            const { code } = data.error
            if (code === 405 || code === 400) {
              console.log(`Error ${code}, pasando al siguiente`);
              index++
              setTimeout(() => {
                return this.downloadWA(patients, retryLimit, retryCount, index);
              }, 1000);
            } else {
              console.log(`Error ${code}, reintentando en unos segundos`);
              setTimeout(() => {
                return this.downloadWA(patients, retryLimit, retryCount + 1, index);
              }, 5000);
            }
          }
        })
    }
  }

  async getWANumbers() {
    //creo que no se necesita el async
    console.log(
      'Estas son las citas sin validar ',
      this.globalVariablesService.allAppointments.appointmentsWitoutValidation
    );
    console.log(
      'Estas son las citas a las cuales les vamos a buscar el WhatsApp: ',
      this.globalVariablesService.allAppointments.appointments
    );
    const patients: any = []
    this.globalVariablesService.allAppointments.appointments.forEach((appointment) => { patients.push(appointment.id_paciente) })

    await this.downloadWA(patients, 10)
  }

  updateAppointment = async (appointments: number[], retryLimit = 50, retryCount = 0, index = 0) => {
    const url = 'https://api.dentalink.healthatom.com/api/v1/citas/'
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${this.globalVariablesService.secretKeys.dentalinkKey}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "id_estado": 24
    });
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      // redirect: 'follow'
    };

    if (index === appointments.length) {
      console.log('Finalizado');
      return
    }

    else {
      return fetch(`${url}${appointments[index]}`, requestOptions)
        .then(async (res) => {
          const data = await res.json()
          console.log(data)
          if (data.data) {
            const templatesWithDataIndex = this.templatesWithData.findIndex(
              (template) => template.appointmentId === appointments[index]
            );
            (this.templatesWithData[
              templatesWithDataIndex
            ].updatedDentalinkLabel = 'Actualizado'),
              (this.templatesWithData[
                templatesWithDataIndex
              ].updatedDentalinkIcon = 'pi pi-check-circle'),
              (this.templatesWithData[
                templatesWithDataIndex
              ].updatedDentalinkSeverity = 'info'),
              console.log(`Cita #${appointments[index]} actualizada`);
            setTimeout(() => {
              return this.updateAppointment(appointments, retryLimit, retryCount, index)
            }, 1000);
            index++
          } else {
            const { code } = data.error
            if (code === 405 || code === 400) {
              console.log(`Error ${code}, pasando al siguiente`);
              index++
              setTimeout(() => {
                return this.updateAppointment(appointments, retryLimit, retryCount, index);
              }, 1000);
            } else {
              console.log(`Error ${code}, reintentando en unos segundos`);
              setTimeout(() => {
                return this.updateAppointment(appointments, retryLimit, retryCount + 1, index);
              }, 5000);
            }
          }
        })
    }
  }

  updateDentalinkAppointments(index = 0) {

    // creamos un array con sólo los IDs de las citas
    const appointments: number[] = []
    this.globalVariablesService.allAppointments.appointments.forEach((appointment) => { appointments.push(appointment.id!) })
    this.updateAppointment(appointments, 10)
  }

  parseWANumber(cellphone: string) {
    //Por aquí debería retornar un array con los whatsapp que no cumplan el formato de 10 numeros para ver cuales son y qué hacer con ellos. Por lo menos imprimirlos en pantalla
    return cellphone.replace(/\D+/g, '').slice(0, 10);
  }
}
